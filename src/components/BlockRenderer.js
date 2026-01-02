"use client";

import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function BlockRenderer({ content }) {
  if (!Array.isArray(content) || content.length === 0) return null;

  return (
    <div className="card article-card">
      <BlocksRenderer
        content={content}
        blocks={{
          image: ({ image }) => (
            <Image
              src={image.url}
              width={image.width || 1200}
              height={image.height || 630}
              alt={image.alternativeText || ""}
            />
          ),
        }}
      />
    </div>
  );
}