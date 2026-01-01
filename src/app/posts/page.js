import Sidebar from "@/components/Sidebar";
import { getLatestPosts } from "@/lib/queries";
import { generateSEO } from "@/lib/seo";
import postsimg from "@/images/T20 World Cup 2026 Latest News.webp";

import LoadMorePosts from "@/components/LoadMorePosts";

export const metadata = generateSEO({
  title: "Latest Cricket News & Updates",
  description: "Read the latest articles, match previews, post-match analysis, and breaking news stories covering the 2026 T20 World Cup. Stay updated with daily cricket insights.",
  url: "/posts",
  image: postsimg.src,
});

export default async function Posts() {
  const posts = await getLatestPosts(15, 0, {
    next: { revalidate: 3600 },
  });

  return (
    <main className="container">
      <div className="layout">
        <section>

          <LoadMorePosts initialPosts={posts} pageSize={15} />

        </section>

        <Sidebar />
      </div>
    </main>
  );
}