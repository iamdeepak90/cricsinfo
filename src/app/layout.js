import { Noticia_Text } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const noticia = Noticia_Text({
  subsets: ["latin"],
  display: "swap",
  variable: "--noticia-text",
  weight: ["400", "700"],
});

export const metadata = {
  metadataBase: new URL('https://t20worldcupnews.com'),
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  title: {
    default: 'T20 World Cup News',
    template: '%s | T20 World Cup News',
  },
  description:
    "Stay updated with the latest news, fixtures, and highlights of the ICC T20 World Cup 2026. Get all the essential information and stay ahead in the tournament countdown!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={noticia.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="dns-prefetch" href="https://media.graphassets.com" />
        <link rel="preconnect" href="https://media.graphassets.com" />
        <style
          id="critical-css"
          dangerouslySetInnerHTML={{
            __html: `/* Critical CSS (inline in app/layout.js) */
:root{
  --bg:#fff;
  --bg-soft:#eee;
  --text:#111;
  --muted:#6b7280;
  --border:#e5e7eb;
  --radius:4px;
  --max:1120px;
}

*{box-sizing:border-box}
html,body{height:100%}

body{
  margin:0;
  font-family: var(--noticia-text), "Noticia Text", serif;
  background:#f7f7f7;
  color:var(--text);
  line-height:1.55;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a{color:inherit;text-decoration:none}
a:hover{text-decoration:underline}

.container{
  width:100%;
  max-width:var(--max);
  margin:0 auto;
  padding:0 16px;
}

/* Header + navbar */
.site-header{
  background:#0b0b0b;
  color:#f3f4f6;
  margin-bottom:16px;
}

.nav-row{
  display:flex;
  align-items:center;
  gap:14px;
  padding:12px;
  flex-wrap:wrap;
}

.brand{
  font-weight:700;
  letter-spacing:.4px;
  white-space:nowrap;
  line-height:0;
}

.nav-toggle{display:none}

.nav-toggle-btn{
  display:none;
  margin-left:auto;
  cursor:pointer;
  user-select:none;
  font-size:20px;
  padding:6px 10px;
  border:1px solid rgba(255,255,255,.18);
  border-radius:var(--radius);
}

.nav-right{
  display:flex;
  align-items:center;
  gap:18px;
  margin-left:auto;
}

.nav{
  display:flex;
  gap:10px;
  flex-wrap:wrap;
}

.nav-link{
  color:#f3f4f6;
  opacity:.95;
  padding:6px 10px;
  border-radius:var(--radius);
}

.nav-link:hover{
  opacity:1;
  background:rgba(255,255,255,.12);
  text-decoration:none;
  color:#f3f4f6;
}

.nav-link.active{background:rgba(255,255,255,.2)}

.nav-search{
  display:flex;
  gap:6px;
  align-items:center;
}

.nav-search input{
  width:260px;
  max-width:100%;
  padding:10px;
  border-radius:var(--radius);
  border:1px solid rgba(255,255,255,.18);
  background:#111;
  color:#f3f4f6;
  outline:none;
}

.nav-search input::placeholder{color:rgba(243,244,246,.65)}

.nav-search button{
  padding:10px 14px;
  border-radius:var(--radius);
  border:1px solid rgba(255,255,255,.18);
  background:#111;
  color:#f3f4f6;
  cursor:pointer;
}

.nav-search button:hover{background:#1a1a1a}

main{padding:22px 0}

/* Above-the-fold (hero + common atoms) */
.hero{
  background:linear-gradient(180deg,#fafafa,#fff);
  border:1px solid var(--border);
  border-radius:var(--radius);
  overflow:hidden;
}

.hero-grid{
  display:grid;
  grid-template-columns:1.1fr .9fr;
  gap:0;
  align-items:stretch;
}

.hero-copy{padding:22px}

.hero-media img{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
}

/* Inline-style replacements (moved into critical) */
.badge-row{display:flex;gap:8px;flex-wrap:wrap}

.hero-title{
  margin:10px 0 8px;
  font-size:2rem;
  line-height:1.15;
}
.hero-meta{margin:0 0 12px}
.hero-excerpt{margin:0 0 14px}
.hero-actions{display:flex;gap:10px;flex-wrap:wrap}

.row-between{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:10px;
  flex-wrap:wrap;
}
.row-between--baseline{align-items:baseline}
.row-end{
  display:flex;
  justify-content:flex-end;
  align-items:center;
  gap:10px;
  flex-wrap:wrap;
}

.card-topline{margin-bottom:6px}
.card-title{font-weight:700;margin-bottom:4px}
.page-title{margin:0;font-size:1.7rem;font-weight:700;letter-spacing:.25px}

.spacer-10{height:10px}
.spacer-12{height:12px}

.badge{
  display:inline-block;
  font-size:.85rem;
  font-weight:700;
  padding:5px 8px;
  border:1px solid var(--border);
  background:var(--bg-soft);
  border-radius:var(--radius);
}

.meta{
  color:var(--muted);
  font-size:.95rem;
}

.btn{
  display:inline-block;
  border-radius:var(--radius);
  padding:8px 16px;
  border:1px solid #111;
  cursor:pointer;
  font-weight:700;
  background:#111;
  color:#fff;
}

.btn:hover{background:#1a1a1a}

.btn-outline{
  background:transparent;
  color:#111;
}

.btn-outline:hover{background:#111;color:#fff}

/* Responsive navbar (critical) */
@media (max-width: 900px){
  .nav-toggle-btn{display:inline-flex}
  .nav-right{
    display:none;
    width:100%;
    margin-left:0;
    flex-direction:column;
    align-items:stretch;
    gap:10px;
  }
  .nav{flex-direction:column; gap:6px}
  .nav-search{width:100%}
  .nav-search input{flex:1; width:100%}
  .nav-toggle:checked ~ .nav-right{display:flex}
}

/* Responsive hero (critical) */
@media (max-width: 980px){
  .hero-grid{grid-template-columns:1fr}
  .hero-copy{padding:16px}
}`,
          }}
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}