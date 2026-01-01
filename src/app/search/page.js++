import Sidebar from '@/components/Sidebar';
import { searchPosts } from '@/lib/queries';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';


export async function generateMetadata({ searchParams }) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || 'Search';
  return {
    title: `You searched for "${query}" - T20 World Cup News`,
    description: `Search results for ${query}. Find related news, schedules, players, and match updates on T20WorldCupNews.com.`,
    robots: {
      index: false,
      follow: true,
    },
    canonical: 'https://t20worldcupnews.com',
  };
}

export default async function SearchPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const searchQuery = resolvedParams?.q || '';
  const posts = searchQuery ? await searchPosts(searchQuery) : [];

  return (
<main className="container">
  <div className="layout">
    <section>
      <div
        style={{
          alignItems: "baseline",
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "space-between",
        }}>
        <h1
          style={{
            fontSize: "1.7rem",
            letterSpacing: ".25px",
            margin: "0",
          }}>
          Search results for: {searchQuery}
        </h1>
      </div>
      
      {posts.map((post) => (
      <article key={post.id} className="card card-hover post-card">
        <div className="post-row">
          <div className="post-media">
            <Image src={post.coverImage.url} width={300} height={240} 
              alt={post.coverImage.altText}
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAk0lEQVR4ARyMsQmAMBREzzQWgoM4hhs4hSu4gAtYuJOFhWItKEqakEBIQggkX0x7995jbdtS3/c0jiPN80zTNNEwDNR1HTVNQ8wYA2stiqJAVVWo6xplWSKlhBgjmFIKnHM8z4PrunDfN973hRACzjkwrXUe933Huq5YlgXbtmXorzPvPaSUOM8zH8dxZOEvhxDwAQAA//+Ro3vUAAAABklEQVQDAFlyXgftTnIBAAAAAElFTkSuQmCC"
            />
          </div>
          <div className="post-body">
            <div
              style={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "space-between",
              }}>
              {post.categories.map((cat) => (
                <span key={cat.name} className="badge">{cat.name}</span>
              ))}
              <span className="meta">{formatDate(post.date)}</span>
            </div>
            <div className="post-title">
              <Link href={`/${post.slug}`}>{post.title}</Link>
            </div>
            <p className="meta post-excerpt">{post.excerpt}</p>
            <Link href={`/${post.slug}`} className="small-link">Read more →</Link>
          </div>
        </div>
      </article>

      ))}
    </section>

    <Sidebar />
  </div>
</main>
  );
}