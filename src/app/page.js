import Image from "next/image";
import { getLatestPosts, getPageBySlug, getFeaturedPost } from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import { generateHomepageSchema, SchemaScript } from "@/lib/schema";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import homeimg from "@/images/icc-t20-world-cup-2026-live.webp";
import Sidebar from "@/components/Sidebar";

export const metadata = buildMetadata({
  title: "T20 World Cup 2026 Schedule, Score Updates & Watch Online",
  description: "Your front-row seat to T20 World Cup 2026. Get the full schedule (Fixtures PDF), live ball-by-ball scores and coverage of India vs Pakistan from Colombo.",
  url: "https://t20worldcupnews.com",
  image: homeimg.src,
});

export default async function Home() {
  const [posts, fpost, page] = await Promise.all([
    getLatestPosts(6),
    getFeaturedPost(),
    getPageBySlug("home"),
  ]);
  const schemas = generateHomepageSchema(page.content.html);
  return (
<>
<SchemaScript schema={schemas} />

    <main className="container">
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            {fpost.categories.map((cat) => (
              <span key={cat.name} className="badge">
                {cat.name}
              </span>
            ))}

            <h2 className="hero-title">{fpost.title}</h2>

            <p className="meta hero-meta">
              By {fpost.author.name} | {formatDate(fpost.date)}
            </p>

            <p className="hero-excerpt">{fpost.excerpt}</p>

            <div className="hero-actions">
              <Link href={`/${fpost.slug}`} className="btn">
                Read more ↗
              </Link>
            </div>
          </div>

          <div className="hero-media">
            <Image
              src={fpost.coverImage.url}
              width={490}
              height={310}
              alt={fpost.coverImage.altText}
              priority
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <div className="section-head">
        <h3 className="section-title">Recent Posts</h3>
        <Link className="small-link" href="/posts">View all</Link>
      </div>

      <section className="grid-3 mb-1">
        {posts.map((post) => (
          <Link
            key={post.slug}
            className="card card-hover category-card"
            href={`/${post.slug}`}
          >
            <Image
              src={post.coverImage.url}
              width={330}
              height={181}
              alt={fpost.coverImage.altText}
              className="thumb"
            />

            <div className="row-between card-topline">
              <div className="badge-row">
                {post.categories.map((cat) => (
                  <span key={cat.name} className="badge">
                    {cat.name}
                  </span>
                ))}
              </div>

              <span className="meta">{formatDate(post.date)}</span>
            </div>

            <div className="card-title">{post.title}</div>
          </Link>
        ))}
      </section>
      <div className="layout">
        <article>
          <div className="card article-card">
            <h1>{page.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: page.content.html }} />
          </div>
        </article>
        <Sidebar />
      </div>
    </main>
</>
  );
}