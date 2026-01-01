import Sidebar from "@/components/Sidebar";
import { getPostsByCategory } from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { generateCategoryPageSchema, SchemaScript } from "@/lib/schema";
import { generateSEO } from "@/lib/seo";


export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { category } = await getPostsByCategory(resolvedParams.slug, 0, {
    next: { revalidate: 3600 },
  });

  return generateSEO({
    title: category.seoOverride.title,
    description: category.seoOverride.description,
    url: `/category/${resolvedParams.slug}`,
    image: category.seoOverride.image.url
  });

}


export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const { category, posts } = await getPostsByCategory(resolvedParams.slug, 20, {
    next: { revalidate: 3600 },
  });

  const schemas = generateCategoryPageSchema(category, posts);

  return (
    <>
      <SchemaScript schema={schemas} />

      <main className="container">
        <div className="layout">
          <section>
            <div className="row-between row-between--baseline">
              <h1 className="page-title">{category.seoOverride.title}</h1>
              <p>{category.seoOverride.description}</p>
            </div>

            <div className="spacer-10" />

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
          </section>

          <Sidebar />
        </div>
      </main>
    </>
  );
}