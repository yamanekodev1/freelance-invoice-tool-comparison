import { z } from "zod";

const categorySlugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "categorySlug must be lowercase alphanumeric with hyphens",
  });

export const postFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  publishedAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }).optional(),
  category: z.string().min(1),
  categorySlug: categorySlugSchema,
  tags: z.array(z.string().min(1)).min(1),
  affiliateDisclosure: z.boolean(),
  ogImage: z.string().optional(),
});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;

export type PostMeta = PostFrontmatter & {
  slug: string;
};

export type PostWithContent = PostMeta & {
  content: string;
};
