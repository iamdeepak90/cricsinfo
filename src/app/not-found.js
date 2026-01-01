// src/app/not-found.js
import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | T20 World Cup News",
};

export default function NotFound() {
  return (
    <div
      className="container"
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      <h1 style={{ fontSize: "10rem", margin: "0 0 -30px" }}>404</h1>

      <h2 style={{ fontSize: "1.5rem", margin: "0 0 10px" }}>Page Not Found</h2>

      <p style={{ fontSize: "1.1rem", margin: "0 0 30px", color: "#666" }}>
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {/* also fix typo: atuo -> auto */}
        <Link className="btn" style={{ width: "250px", margin: "0 auto" }} href="/">
          Go to Homepage ↗
        </Link>

        <div style={{ marginTop: "20px" }}>
          <h3 style={{ fontSize: "1.2rem" }}>Check our popular pages:</h3>
          <ul style={{ listStyle: "none", display: "flex", gap: "1rem", padding: 0 }}>
            <li><Link href="/t20-world-cup-schedule-list">T20 World Cup 2026 Schedule</Link></li>
            <li><Link href="/team-squads">Teams &amp; Squads</Link></li>
            <li><Link href="/t20-world-cup-predictions">Match Predictions</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}