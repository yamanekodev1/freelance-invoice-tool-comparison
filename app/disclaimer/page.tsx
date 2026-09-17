import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "免責事項",
  description: `${SITE_NAME}の免責事項です。`,
};

export default function DisclaimerPage() {
  return (
    <Container className="prose-site">
      <h1>免責事項</h1>
      <p>
        当サイトに掲載する情報は、正確性の確保に努めますが、その完全性・最新性を保証するものではありません。
      </p>
      <h2>情報の利用について</h2>
      <p>
        記事の内容に基づいてユーザーが行った判断・行動により生じた損害について、当サイト運営者は一切の責任を負いません。税務・法務・契約に関する最終判断は、専門家への相談を推奨します。
      </p>
      <h2>アフィリエイト・広告</h2>
      <p>
        当サイトにはプロモーションを含む記事や広告リンクが含まれる場合があります。リンク先のサービス利用に関するトラブルについて、当サイト運営者は責任を負いかねます。
      </p>
      <h2>リンク先</h2>
      <p>
        当サイトからリンクされている外部サイトの内容・サービスについて、当サイト運営者は管理せず、責任を負いません。
      </p>
    </Container>
  );
}
