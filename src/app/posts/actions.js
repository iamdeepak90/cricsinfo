"use server";

import { getLatestPosts } from "@/lib/queries";

export async function loadMorePosts(skip, limit = 15) {
  const posts = await getLatestPosts(limit, skip, { next: { revalidate: 3600 } });
  return posts;
}