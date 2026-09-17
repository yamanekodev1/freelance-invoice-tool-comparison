import type { Metadata } from "next";
import { ContactFormLink } from "@/components/layout/contact-form-link";
import { Container } from "@/components/layout/container";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "運営者情報",
  description: `${SITE_NAME}の運営者情報ページです。`,
};

export default function AboutPage() {
  return (
    <Container className="prose-site">
      <h1>運営者情報</h1>
      <p>
        {SITE_NAME}
        は、副業エンジニア・フリーランスエンジニア向けに、業務効率化のためのSaaS比較や実践ノウハウ記事を提供するメディアです。
      </p>
      <h2>コンテンツ方針</h2>
      <ul>
        <li>実務で使える観点を中心に、ツール比較や手順を解説します。</li>
        <li>アフィリエイト等のプロモーションを含む記事には、記事内で明示します。</li>
        <li>記事内容は公開時点の情報に基づき、最新仕様は各サービス公式情報をご確認ください。</li>
      </ul>
      <h2>お問い合わせ</h2>
      <p>
        記事内容の誤りのご指摘、広告主様からのご連絡等は、下記のお問い合わせフォームよりお願いいたします。
      </p>
      <div className="not-prose">
        <ContactFormLink variant="button" />
      </div>
    </Container>
  );
}
