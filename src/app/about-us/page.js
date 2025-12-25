import { getPageBySlug } from "@/lib/queries";

export const metadata = {
  title: "About Us | T20 World Cup 2026 News",
  description: "Welcome to the ultimate destination for cricket enthusiasts gearing up for the 10th edition of the ICC Men's T20 World Cup.",
};

export default async function AboutUs() {
  const page = await getPageBySlug("about");

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