import Sidebar from "@/components/Sidebar";
import { getLatestPosts } from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import postsimg from "@/images/T20 World Cup 2026 Latest News.webp";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Latest Cricket News & Updates",
  description: "Read the latest articles, match previews, post-match analysis, and breaking news stories covering the 2026 T20 World Cup. Stay updated with daily cricket insights.",
  url: "https://t20worldcupnews.com/posts",
  image: postsimg.src,
});

export default async function Posts() {
  const posts = await getLatestPosts(20, {
    next: { revalidate: 3600 },
  });

  return (
    <main className="container">
      <div className="layout">
        <section>

          {posts.map((post) => (
            <article key={post.id} className="card card-hover post-card">
              <div className="post-row">
                <div className="post-media">
                  <Image
                    src={post.coverImage.url}
                    width={300}
                    height={240}
                    alt={post.coverImage.altText}
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAk0lEQVR4ARyMsQmAMBREzzQWgoM4hhs4hSu4gAtYuJOFhWItKEqakEBIQggkX0x7995jbdtS3/c0jiPN80zTNNEwDNR1HTVNQ8wYA2stiqJAVVWo6xplWSKlhBgjmFIKnHM8z4PrunDfN973hRACzjkwrXUe933Huq5YlgXbtmXorzPvPaSUOM8zH8dxZOEvhxDwAQAA//+Ro3vUAAAABklEQVQDAFlyXgftTnIBAAAAAElFTkSuQmCC"
                  />
                </div>

                <div className="post-body">
                  <div className="row-between">
                    <div className="badge-row">
                      {post.categories.map((cat) => (
                        <span key={cat.name} className="badge">
                          {cat.name}
                        </span>
                      ))}
                    </div>
                    <span className="meta">{formatDate(post.date)}</span>
                  </div>

                  <div className="post-title">
                    <Link href={`/${post.slug}`}>{post.title}</Link>
                  </div>

                  <p className="meta post-excerpt">{post.excerpt}</p>
                  <Link href={`/${post.slug}`} className="small-link">
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))}

          <button style={{display:'block', margin:'0 auto'}} className="btn">Load more ...</button>

        </section>

        <Sidebar />
      </div>
    </main>
  );
}