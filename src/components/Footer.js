import "@/app/globals.css";
import Link from "next/link";

export default function Footer(){
  return (
<footer className="site-footer">
  <div className="container footer-row">
    <div>© 2026 - CricsInfo.com</div>
    <div className="footer-links">
      <Link href="/about-us">About Us</Link>
      <Link href="/disclaimer">Disclaimer</Link>
      <Link href="/privacy-policy">Privacy Policy</Link>
    </div>
  </div>
</footer>
  )
}