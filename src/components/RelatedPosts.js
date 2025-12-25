import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default async function RelatedPosts(props){
return (
<>
<div className="section-head">
  <h3 className="section-title">You may also like</h3>
</div>

<section className="grid-3 mb-1 related-post">
  {props.rposts.map((p) => (
    <Link
      key={p.slug}
      className="card card-hover category-card"
      href={`/${p.slug}`}
    >
      <Image
        src={p.coverImage.url}
        width={350}
        height={220}
        alt={p.coverImage.altText}
        className="thumb"
        priority
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAk0lEQVR4ARyMsQmAMBREzzQWgoM4hhs4hSu4gAtYuJOFhWItKEqakEBIQggkX0x7995jbdtS3/c0jiPN80zTNNEwDNR1HTVNQ8wYA2stiqJAVVWo6xplWSKlhBgjmFIKnHM8z4PrunDfN973hRACzjkwrXUe933Huq5YlgXbtmXorzPvPaSUOM8zH8dxZOEvhxDwAQAA//+Ro3vUAAAABklEQVQDAFlyXgftTnIBAAAAAElFTkSuQmCC"
      />
      <div className="card-title">{p.title}</div>
    </Link>
  ))}
</section>
</>
  )
}