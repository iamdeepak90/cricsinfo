import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from "@/lib/queries";
import { formatDate, readTime } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { generateBlogPostSchema, SchemaScript } from "@/lib/schema";
import dynamic from 'next/dynamic';
import Image from "next/image";
import Sidebar from "@/components/Sidebar";

const RelatedPosts = dynamic(() => import('@/components/RelatedPosts'), {
  loading: () => <div className="skeleton">Loading...</div>
});

export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  return posts.map((post) => ({ slug: post.slug }));
}


export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  return buildMetadata({
      title: post.title,
      description: post.excerpt,
      url: `https://t20worldcupnews.com/${resolvedParams.slug}`,
      image: post.coverImage.url
  });
  
}

export default async function BlogPost({ params }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug, {
    next: { revalidate: 3600 },
  });

  if (!post) notFound();

  const schemas = generateBlogPostSchema(post);

  const categorySlugs = post.categories.map(cat => cat.slug);
  const rposts = await getRelatedPosts(
    post.slug,
    categorySlugs,
    3,
    { next: { revalidate: 3600 } }
  );

  return (
<>
    <SchemaScript schema={schemas} />

    <main className="container">
      <div className="layout">
        <article>
          <div className="badge-row">
            {post.categories.map((cat) => (
              <span key={cat.name} className="badge">
                {cat.name}
              </span>
            ))}
          </div>

          <h1 className="hero-title">{post.title}</h1>

          <p className="meta hero-meta">
            By {post.author?.name} | {formatDate(post.date)} |{" "}
            {readTime(post.content.html)}
          </p>

          {post.coverImage && (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.altText || post.title}
              className="post-hero"
              width={750}
              height={400}
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAk0lEQVR4ARyMsQmAMBREzzQWgoM4hhs4hSu4gAtYuJOFhWItKEqakEBIQggkX0x7995jbdtS3/c0jiPN80zTNNEwDNR1HTVNQ8wYA2stiqJAVVWo6xplWSKlhBgjmFIKnHM8z4PrunDfN973hRACzjkwrXUe933Huq5YlgXbtmXorzPvPaSUOM8zH8dxZOEvhxDwAQAA//+Ro3vUAAAABklEQVQDAFlyXgftTnIBAAAAAElFTkSuQmCC"
            />
          )}

          <div className="spacer-12" />

          <div
            className="card article-card"
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          />
          <RelatedPosts rposts={rposts} />
        </article>

        <Sidebar />
      </div>
    </main>
</>
  );
}