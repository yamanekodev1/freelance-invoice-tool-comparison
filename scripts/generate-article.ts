import Anthropic from "@anthropic-ai/sdk";
import { config as loadEnv } from "dotenv";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { slugFromTitle } from "../lib/slug-from-title";
import { postFrontmatterSchema } from "../types/post";

loadEnv({ path: path.join(process.cwd(), ".env") });
loadEnv({ path: path.join(process.cwd(), ".env.local") });

const MODEL = "claude-sonnet-4-6";
const PROMPT_PATH = path.join(process.cwd(), "prompts/comparison-article.md");
const POSTS_DIR = path.join(process.cwd(), "content/posts");

type ArticleInput = {
  topic: string;
  keyword: string;
  tools: string[];
};

function printUsage(): void {
  console.error(`
Usage:
  npm run generate:article -- --topic "..." --keyword "..." --tools "A,B,C"
  npm run generate:article -- --config path/to/input.json

JSON format:
  { "topic": "...", "keyword": "...", "tools": ["A", "B"] }
`);
}

function parseArgs(argv: string[]): ArticleInput | null {
  let configPath: string | undefined;
  let topic: string | undefined;
  let keyword: string | undefined;
  let toolsRaw: string | undefined;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--config") {
      configPath = argv[++i];
      continue;
    }
    if (arg === "--topic") {
      topic = argv[++i];
      continue;
    }
    if (arg === "--keyword") {
      keyword = argv[++i];
      continue;
    }
    if (arg === "--tools") {
      toolsRaw = argv[++i];
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      printUsage();
      process.exit(0);
    }
  }

  if (configPath) {
    const resolved = path.resolve(process.cwd(), configPath);
    if (!fs.existsSync(resolved)) {
      console.error(`Config file not found: ${resolved}`);
      process.exit(1);
    }
    const parsed = JSON.parse(fs.readFileSync(resolved, "utf8")) as Partial<ArticleInput>;
    return validateInput({
      topic: parsed.topic,
      keyword: parsed.keyword,
      tools: parsed.tools,
    });
  }

  if (!topic || !keyword || !toolsRaw) {
    return null;
  }

  const tools = toolsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return validateInput({ topic, keyword, tools });
}

function validateInput(raw: {
  topic?: string;
  keyword?: string;
  tools?: string[];
}): ArticleInput {
  const topic = raw.topic?.trim();
  const keyword = raw.keyword?.trim();
  const tools = raw.tools?.map((t) => t.trim()).filter(Boolean) ?? [];

  if (!topic || !keyword || tools.length === 0) {
    console.error("Error: topic, keyword, and at least one tool are required.");
    printUsage();
    process.exit(1);
  }

  return { topic, keyword, tools };
}

function loadPromptTemplate(input: ArticleInput): string {
  if (!fs.existsSync(PROMPT_PATH)) {
    console.error(`Prompt template not found: ${PROMPT_PATH}`);
    process.exit(1);
  }

  const template = fs.readFileSync(PROMPT_PATH, "utf8");
  const todayIso = new Date().toISOString();
  const toolsList = input.tools.join("、");

  return template
    .replaceAll("{{TOPIC}}", input.topic)
    .replaceAll("{{KEYWORD}}", input.keyword)
    .replaceAll("{{TOOLS}}", toolsList)
    .replaceAll("{{TODAY_ISO8601}}", todayIso);
}

function stripCodeFence(text: string): string {
  const trimmed = text.trim();
  const fenceMatch = /^```(?:mdx?|markdown)?\s*\n([\s\S]*?)\n```$/i.exec(trimmed);
  if (fenceMatch) {
    return fenceMatch[1].trim();
  }
  return trimmed;
}

function validateMdx(mdx: string): { data: Record<string, unknown>; content: string } {
  if (!mdx.startsWith("---")) {
    console.error("Validation failed: MDX must start with front matter (---).");
    process.exit(1);
  }

  let parsed: ReturnType<typeof matter>;
  try {
    parsed = matter(mdx);
  } catch (err) {
    console.error("Validation failed: could not parse front matter.", err);
    process.exit(1);
  }

  const result = postFrontmatterSchema.safeParse(parsed.data);
  if (!result.success) {
    console.error("Validation failed: front matter does not match schema.");
    console.error(result.error.format());
    process.exit(1);
  }

  const description = result.data.description;
  if ([...description].length > 120) {
    console.error(
      `Validation failed: description must be 120 characters or less (got ${[...description].length}).`,
    );
    process.exit(1);
  }

  if (!parsed.content.trim()) {
    console.error("Validation failed: article body is empty.");
    process.exit(1);
  }

  return { data: parsed.data, content: parsed.content };
}

async function generateMdx(systemPrompt: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error(
      "Error: ANTHROPIC_API_KEY is not set. Add it to .env or .env.local (see .env.example).",
    );
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 8192,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content:
          "上記の条件に従い、完成したMDXファイルの中身のみを出力してください。",
      },
    ],
  });

  const textBlock = message.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    console.error("Error: model returned no text content.");
    process.exit(1);
  }

  return stripCodeFence(textBlock.text);
}

function saveArticle(mdx: string, title: string): string {
  const slug = slugFromTitle(title);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    console.error(`Validation failed: generated slug is invalid: ${slug}`);
    process.exit(1);
  }

  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (fs.existsSync(filePath)) {
    console.error(
      `Error: file already exists for slug "${slug}": ${filePath}\nChange the title or remove the existing file.`,
    );
    process.exit(1);
  }

  fs.writeFileSync(filePath, `${mdx.trim()}\n`, "utf8");
  return filePath;
}

async function main(): Promise<void> {
  const input = parseArgs(process.argv.slice(2));
  if (!input) {
    printUsage();
    process.exit(1);
  }

  const systemPrompt = loadPromptTemplate(input);
  console.error(`Generating article (model: ${MODEL})…`);

  const rawMdx = await generateMdx(systemPrompt);
  const { data } = validateMdx(rawMdx);
  const title = String(data.title);
  const filePath = saveArticle(rawMdx, title);

  console.log("Article generated successfully.");
  console.log(`Title: ${title}`);
  console.log(`Saved: ${filePath}`);
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
