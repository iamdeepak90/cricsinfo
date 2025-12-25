import { getPageBySlug } from "@/lib/queries";

export const metadata = {
  title: "Privacy Policy | T20 World Cup 2026 News",
  description: "Privacy Policy of T20 World Cup 2026 News",
};

export default async function PrivacyPolicy() {
  const page = await getPageBySlug("privacy");

  return (
<>
    <main className="container">
        <article className="pages">
            <div
            className="card article-card"
            dangerouslySetInnerHTML={{ __html: page.content.html }}
            />
        </article>
    </main>
</>
  );
}