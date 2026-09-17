import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: `${SITE_NAME}のプライバシーポリシーです。`,
};

export default function PrivacyPage() {
  return (
    <Container className="prose-site">
      <h1>プライバシーポリシー</h1>
      <p>
        {SITE_NAME}
        （以下「当サイト」）は、ユーザーの個人情報の保護を重要視し、以下の方針に基づき適切に取り扱います。
      </p>
      <h2>1. 収集する情報</h2>
      <p>
        当サイトでは、アクセス解析のため Cookie や類似技術を利用する場合があります。フォーム等を設置した場合、お問い合わせ内容に含まれる情報を取得することがあります。
      </p>
      <h2>2. 利用目的</h2>
      <p>
        取得した情報は、サイト改善、お問い合わせ対応、不正利用の防止等の目的で利用します。
      </p>
      <h2>3. 第三者提供</h2>
      <p>
        法令に基づく場合を除き、本人の同意なく第三者に個人情報を提供しません。
      </p>
      <h2>4. 改定</h2>
      <p>
        本ポリシーは、必要に応じて改定することがあります。改定後の内容は当ページに掲載します。
      </p>
    </Container>
  );
}
