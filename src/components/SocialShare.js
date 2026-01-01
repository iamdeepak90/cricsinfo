"use client";

import React, { useMemo } from "react";
import {
  XIcon, FacebookIcon, LinkedInIcon, RedditIcon, PinterestIcon, WhatsAppIcon
} from "@/components/SocialIcons";
import styles from "./SocialShare.module.css";

function enc(v) {
  return encodeURIComponent(v || "");
}

export default React.memo(function SocialShare({
  url,
  title = "",
  pinterestMedia,
  tooltips = true,
}) {
  const links = useMemo(() => {
    if (!url) return null;

    return [
      { key: "facebook", label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, Icon: FacebookIcon },
      { key: "x", label: "Twitter / X", href: `https://twitter.com/intent/tweet?url=${enc(url)}${title ? `&text=${enc(title)}` : ""}`, Icon: XIcon },
      { key: "linkedin", label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`, Icon: LinkedInIcon },
      { key: "reddit", label: "Reddit", href: `https://www.reddit.com/submit?url=${enc(url)}${title ? `&title=${enc(title)}` : ""}`, Icon: RedditIcon },
      {
        key: "pinterest",
        label: "Pinterest",
        href:
          `https://pinterest.com/pin/create/button/?url=${enc(url)}` +
          (title ? `&description=${enc(title)}` : "") +
          (pinterestMedia ? `&media=${enc(pinterestMedia)}` : ""),
        Icon: PinterestIcon,
      },
      { key: "whatsapp", label: "WhatsApp", href: `https://wa.me/?text=${enc(title ? `${title} ${url}` : url)}`, Icon: WhatsAppIcon },
    ];
  }, [url, title, pinterestMedia]);

  if (!links) return null;

  return (
    <aside className={styles.wrap} aria-label="Share">
      <div className={styles.stack}>
        {links.map(({ key, label, href, Icon }) => (
          <a
            key={key}
            className={`${styles.btn} ${styles[key + "-icon"]}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${label}`}
            title={tooltips ? `Share on ${label}` : undefined}
          >
            <Icon />
          </a>
        ))}
      </div>
    </aside>
  );
});