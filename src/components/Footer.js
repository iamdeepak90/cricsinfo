import "@/app/globals.css";
import Link from "next/link";

export default function Footer(){
  return (
<footer className="site-footer">
  <div className="container footer-row">
    <div>© T20 World Cup 2026 | This is not an official website.</div>
    <div className="footer-links">
      <Link href="/about-us">About Us</Link>
      <Link href="/disclaimer">Disclaimer</Link>
      <Link href="/privacy-policy">Privacy Policy</Link>
    </div>
  </div>
</footer>
  )
}