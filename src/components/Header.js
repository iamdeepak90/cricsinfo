import Image from "next/image";
import logo from "@/images/t20logo.png";
import Link from "next/link";

export default async function Header(){
  return (
<header className="site-header">
  <div className="container nav-row">
    <Link className="brand" href="/">
        <Image src={logo} alt="T20 World Cup News" width={165}/>
    </Link>
    <input className="nav-toggle" type="checkbox" id="nav-toggle" />
    <label className="nav-toggle-btn" htmlFor="nav-toggle" aria-label="Toggle menu">☰</label>
    <div className="nav-right">
      <nav className="nav" aria-label="Primary">
        <Link className="nav-link" href="/t20-world-cup-schedule-list">Schedule</Link>
        <Link className="nav-link" href="/ticket-booking-online">Tickets</Link>
        <Link className="nav-link" href="/">Live Score</Link>
        <Link className="nav-link" href="/points-table-standings-nrr">Points Table</Link>
        <Link className="nav-link" href="/category/teams">Teams</Link>
        <Link className="nav-link" href="/category/news">News</Link>
      </nav>
      <form className="nav-search" action="search" method="get" role="search">
        <input type="search" name="q" placeholder="Search news..." aria-label="Search news" />
        <button type="submit">Search</button>
      </form>
    </div>
  </div>
</header>
  )
}