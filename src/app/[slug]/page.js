import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import BlockRenderer from "@/components/BlockRenderer";
import { generateSEO } from "@/lib/seo";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) notFound();
  
  return generateSEO({
    title: post.SEO.metaTitle,
    description: post.SEO.metaDescription,
    url: `/${post.Slug}`,
    image: post.FeaturedImage?.url,
    type: 'article',
  });
  
}

export default async function BlogPost({ params }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug, {
    next: { revalidate: 3600 },
  });
  console.log(post);
  if (!post) notFound();

  return (
<>

    <main className="container">
      <div className="layout">
        <article>
          <div className="badge-row">
            {post.Categories.map((cat) => (
              <span key={cat.name} className="badge">
                {cat.name}
              </span>
            ))}
          </div>

          <h1 className="hero-title">{post.Title}</h1>

          <p className="meta hero-meta">
            By {post.Author?.name} | {formatDate(post.publishedAt)}
          </p>

          {post.FeaturedImage && (
            <Image
              src={`https://admin.cricsinfo.com${post.FeaturedImage.url}`}
              alt={post.FeaturedImage.alternativeText}
              className="post-hero"
              width={730}
              height={380}
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAk0lEQVR4ARyMsQmAMBREzzQWgoM4hhs4hSu4gAtYuJOFhWItKEqakEBIQggkX0x7995jbdtS3/c0jiPN80zTNNEwDNR1HTVNQ8wYA2stiqJAVVWo6xplWSKlhBgjmFIKnHM8z4PrunDfN973hRACzjkwrXUe933Huq5YlgXbtmXorzPvPaSUOM8zH8dxZOEvhxDwAQAA//+Ro3vUAAAABklEQVQDAFlyXgftTnIBAAAAAElFTkSuQmCC"
            />
          )}

          <div className="spacer-12" />

          <BlockRenderer content={post.Content} />
          {/* <RelatedPosts rposts={rposts} /> */}
        </article>

        <Sidebar />
      </div>
    </main>


    {/* <SocialShare
      url={`https://www.cricsinfo.com/${post.slug}`}
      title={post.title}
      pinterestMedia={post.coverImage?.url}
    /> */}
</>
  );
}