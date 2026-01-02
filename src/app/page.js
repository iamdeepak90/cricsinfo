import Image from "next/image";
import { getLatestPosts } from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { generateSEO } from "@/lib/seo";
import homeimg from "@/images/icc-t20-world-cup-2026-live.webp";
import Sidebar from "@/components/Sidebar";

export const metadata = generateSEO({
  title: "CricsInfo | Live Cricket Scores, Latest News & Match Updates",
  description: "Stay updated with the latest cricket news, expert analysis, live match coverage, schedules, scorecards and team rankings, player stats. Follow every Test, ODI, T20 & league action.",
  url: "/",
  image: homeimg.src,
});

export default async function Home() {
  const [fpost] = await Promise.all([
    getLatestPosts(7)
  ]);
  return (
<>
    <main className="container">
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            {fpost[0].Categories.map((cat) => (
              <span key={cat.name} className="badge">
                {cat.name}
              </span>
            ))}

            <h2 className="hero-title">{fpost[0].Title}</h2>

            <p className="meta hero-meta">
              By {fpost[0].Author.name} | {formatDate(fpost[0].publishedAt)}
            </p>

            <p className="hero-excerpt">{fpost[0].SEO.metaDescription}</p>

            <div className="hero-actions">
              <Link href={`/${fpost[0].Slug}`} className="btn">
                Read more ↗
              </Link>
            </div>
          </div>

          <div className="hero-media">
            <Image
              src={`https://admin.cricsinfo.com${fpost[0].FeaturedImage.url}`}
              width={490}
              height={310}
              alt={fpost[0].FeaturedImage.alternativeText}
              priority
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <div className="section-head">
        <h3 className="section-title">Featured Post</h3>
        <Link className="small-link" href="/posts">All Recent Posts →</Link>
      </div>

      <section className="grid-3 mb-1">
        {fpost.slice(1).map((post) => (
          <Link
            key={post.documentId}
            className="card card-hover category-card"
            href={`/${post.slug}`}
          >
            <Image
              src={post.FeaturedImage.url}
              width={330}
              height={181}
              alt={post.FeaturedImage.alternativeText}
              className="thumb"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAk0lEQVR4ARyMsQmAMBREzzQWgoM4hhs4hSu4gAtYuJOFhWItKEqakEBIQggkX0x7995jbdtS3/c0jiPN80zTNNEwDNR1HTVNQ8wYA2stiqJAVVWo6xplWSKlhBgjmFIKnHM8z4PrunDfN973hRACzjkwrXUe933Huq5YlgXbtmXorzPvPaSUOM8zH8dxZOEvhxDwAQAA//+Ro3vUAAAABklEQVQDAFlyXgftTnIBAAAAAElFTkSuQmCC"
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
            {/* <h1>{page.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: page.content.html }} /> */}
          </div>
        </article>
        <Sidebar />
      </div>
    </main>
</>
  );
}