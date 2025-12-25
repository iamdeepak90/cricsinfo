import { getLatestPosts } from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default async function RecentPosts(){
  const posts = await getLatestPosts(5);
  return (
  <div className="sidebar-box">
    <h3>Recent Posts</h3>
    {posts.map((post) => (
      <Link key={post.slug} className="recent-item" href={`/${post.slug}`}>
        <Image
            src={post.coverImage.url}
            width={100}
            height={100}
            alt={post.coverImage.altText}
            priority
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAk0lEQVR4ARyMsQmAMBREzzQWgoM4hhs4hSu4gAtYuJOFhWItKEqakEBIQggkX0x7995jbdtS3/c0jiPN80zTNNEwDNR1HTVNQ8wYA2stiqJAVVWo6xplWSKlhBgjmFIKnHM8z4PrunDfN973hRACzjkwrXUe933Huq5YlgXbtmXorzPvPaSUOM8zH8dxZOEvhxDwAQAA//+Ro3vUAAAABklEQVQDAFlyXgftTnIBAAAAAElFTkSuQmCC"
          />
        <div>
          <div className="title">{post.title}</div>
          <div className="meta">{formatDate(post.date)}</div>
        </div>
      </Link>
    ))}
  </div>
  )
}