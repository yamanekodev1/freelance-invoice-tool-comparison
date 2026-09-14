# 副業エンジニア向け SaaS 比較・ハウツーメディア

Next.js（App Router）+ MDX によるコンテンツサイトの土台です。記事は `content/posts/` 配下の MDX ファイルで管理し、Vercel へのデプロイを想定しています。

## 開発

```bash
npm install
cp .env.example .env.local
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## 新しい記事の追加

1. `content/posts/` に `{slug}.mdx` を作成します（URL は `/posts/{slug}` になります）。
2. ファイル先頭に front matter（YAML）を書き、本文をその下に Markdown/MDX で記述します。

### front matter テンプレート

```yaml
---
title: "記事タイトル"
description: "SEO 用の説明文（120〜160 文字程度を目安）"
publishedAt: "2026-09-14T00:00:00+00:00"
updatedAt: "2026-09-14T00:00:00+00:00"   # 省略可
category: "請求書ツール"                  # 画面表示用（日本語可）
categorySlug: "invoice-tools"           # URL 用（英小文字・ハイフンのみ）
tags:
  - "請求書"
  - "副業"
affiliateDisclosure: false              # true で PR 開示バナーを表示
ogImage: "/images/og/example.png"       # 省略可（動的 OG 画像にフォールバック）
---
```

### 必須フィールド

| フィールド | 説明 |
| --- | --- |
| `title` | 記事タイトル |
| `description` | meta description |
| `publishedAt` | 公開日時（ISO 8601） |
| `category` | カテゴリ表示名 |
| `categorySlug` | カテゴリ URL スラッグ（`/category/[categorySlug]`） |
| `tags` | タグ配列（1 件以上） |
| `affiliateDisclosure` | プロモーション開示の有無 |

### category と categorySlug

- **category**: ユーザー向け表示（例: `会計ソフト`、`請求書ツール`）
- **categorySlug**: 英数字スラッグ（例: `accounting`, `invoice-tools`）。同一スラッグの記事は同じカテゴリページに集約されます。

## 記事の自動生成（Anthropic API）

`scripts/generate-article.ts` が比較記事 MDX を生成し、`content/posts/` に保存します。バリデーションに失敗した場合は保存せず終了します（自動 commit はしません）。

`.env` または `.env.local` に `ANTHROPIC_API_KEY` を設定してください（`.env.example` 参照）。

```bash
# CLI 引数
npm run generate:article -- \
  --topic "副業エンジニア向けクラウド請求書ツール3選" \
  --keyword "副業 請求書 ツール" \
  --tools "freee請求書,Misoca,マネーフォワード クラウド請求書"

# JSON 設定ファイル（例: scripts/article-input.example.json）
npm run generate:article -- --config scripts/article-input.example.json
```

プロンプトテンプレートは [`prompts/comparison-article.md`](prompts/comparison-article.md) です。

## ビルド

```bash
npm run build
npm start
```

front matter が不正な MDX があるとビルド時にエラーになります。

## Vercel デプロイ

1. リポジトリを Vercel に接続
2. 環境変数 `NEXT_PUBLIC_SITE_URL` に本番 URL（例: `https://example.com`）を設定
3. デプロイ

サイトマップ（`/sitemap.xml`）と robots.txt は App Router の Metadata Route から自動生成されます。

## 環境変数

`.env.example` を参照してください。将来 Supabase 等を追加する場合のプレースホルダを含めています。

## 技術スタック

- Next.js（App Router）+ TypeScript
- Tailwind CSS + shadcn/ui
- `next-mdx-remote` + `gray-matter` + Zod
- デプロイ: Vercel
