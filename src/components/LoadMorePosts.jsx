"use client";

import { useState, useTransition } from "react";
import { loadMorePosts } from "@/app/posts/actions";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

export default function LoadMorePosts({ initialPosts, pageSize = 15 }) {
  const [posts, setPosts] = useState(initialPosts);
  const [ended, setEnded] = useState(false);
  const [isPending, startTransition] = useTransition();

  function onLoadMore() {
    startTransition(async () => {
      const next = await loadMorePosts(posts.length, pageSize);

      if (!next || next.length === 0) {
        setEnded(true);
        return;
      }

      setPosts((p) => [...p, ...next]);
      if (next.length < pageSize) setEnded(true);
    });
  }

  return (
    <>
      {posts.map((post) => (
        <article key={post.id} className="card card-hover post-card">
          <div className="post-row">
            <div className="post-media">
              <Image
                src={post.coverImage.url}
                width={300}
                height={240}
                alt={post.coverImage.altText || post.title}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAk0lEQVR4ARyMsQmAMBREzzQWgoM4hhs4hSu4gAtYuJOFhWItKEqakEBIQggkX0x7995jbdtS3/c0jiPN80zTNNEwDNR1HTVNQ8wYA2stiqJAVVWo6xplWSKlhBgjmFIKnHM8z4PrunDfN973hRACzjkwrXUe933Huq5YlgXbtmXorzPvPaSUOM8zH8dxZOEvhxDwAQAA//+Ro3vUAAAABklEQVQDAFlyXgftTnIBAAAAAElFTkSuQmCC"
              />
            </div>

            <div className="post-body">
              <div className="row-between">
                <div className="badge-row">
                  {(post.categories ?? []).map((cat) => (
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

      {!ended ? (
        <button className="btn" style={{display: 'block', margin: '0 auto'}} onClick={onLoadMore} disabled={isPending}>
          {isPending ? "Loading..." : "Load more ..."}
        </button>
      ) : (
        <p style={{ textAlign: "center", opacity: 0.7 }}>You’ve reached the end.</p>
      )}
    </>
  );
}