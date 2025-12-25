import { GetAllCategory } from "@/lib/queries";
import Link from "next/link";
import Image from "next/image";
import ad300x600 from '@/images/300x600.webp';
import RecentPosts from "./RecentPosts";

export default async function Sidebar(){
  const cats = await GetAllCategory();
  return (
<aside>
  <div className="sidebar-box">
    <h3>Categories</h3>
    <div className="sidebar-tags">
      {cats.map((cat) => (
        <Link key={cat.id} className="badge" href={`/category/${cat.slug}`}>{cat.name}</Link>
      ))}
    </div>
  </div>

  <RecentPosts />

  <div className="sidebar-box sidebar-sticky">
    <Image src={ad300x600} alt="AD Code" />
  </div>
</aside>
  )
}