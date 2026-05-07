"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="navbar" id="navbar" style={{
      background: isScrolled ? "rgba(255, 255, 255, 0.97)" : "rgba(255, 255, 255, 0.85)",
      boxShadow: isScrolled ? "0 2px 20px rgba(0, 0, 0, 0.08)" : "none",
    }}>
      <div className="container navbar-container">
        <Link href="/" className="logo" style={{ lineHeight: "1.2", display: "inline-block" }}>Parasharr Dynasty Astrology <br /><span style={{ fontSize: "0.55em", opacity: 0.9, display: "block", marginTop: "-2px" }}>by Dr Priti</span></Link>
        <div className="nav-right">
          {session ? (
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
              <span style={{ color: "var(--light-accent)", fontSize: "0.9rem" }}>{session.user?.name}</span>
              <button onClick={() => signOut()} className="btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>Sign Out</button>
            </div>
          ) : (
            <Link href="/login" className="nav-cta btn-primary">Login</Link>
          )}
          <button 
            className={`hamburger-menu ${isMenuOpen ? "active" : ""}`} 
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
        <nav className={`nav-dropdown ${isMenuOpen ? "active" : ""}`} id="nav-dropdown">
          <ul className="nav-list">
            <li><Link href="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link href="/#services" className="nav-link" onClick={() => setIsMenuOpen(false)}>Services</Link></li>
            <li><Link href="/#process" className="nav-link" onClick={() => setIsMenuOpen(false)}>Our Process</Link></li>
            <li><Link href="/testimonies" className="nav-link" onClick={() => setIsMenuOpen(false)}>Case Studies</Link></li>
            <li className="mobile-cta-item">
              <Link href="/#audit-teaser" className="btn-primary mobile-nav-cta" onClick={() => setIsMenuOpen(false)}>
                Schedule
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
