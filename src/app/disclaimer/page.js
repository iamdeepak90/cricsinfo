import { getPageBySlug } from "@/lib/queries";

export const metadata = {
  title: "Disclaimer | T20 World Cup 2026 News",
  description: "Disclaimer of T20 World Cup 2026 News",
};

export default async function Disclaimer() {
  const page = await getPageBySlug("disclaimer");

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