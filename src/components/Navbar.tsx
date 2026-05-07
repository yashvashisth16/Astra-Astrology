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
        <Link href="/" className="logo" style={{ lineHeight: "1.2", display: "inline-block", fontSize: "clamp(1.1rem, 4vw, 1.75rem)" }}>
          Parasharr Dynasty Astrology <br />
          <span style={{ fontSize: "0.55em", opacity: 0.9, display: "block", marginTop: "-2px" }}>by Dr Priti</span>
        </Link>
        <div className="nav-right" style={{ display: "flex", alignItems: "center" }}>
          
          {/* Desktop Auth Controls */}
          <div className="desktop-auth" style={{ display: "flex", alignItems: "center", gap: "15px", marginRight: "1rem" }}>
            {session ? (
              <>
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{session.user?.name}</span>
                <button onClick={() => signOut()} className="btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>Sign Out</button>
              </>
            ) : (
              <Link href="/login" className="nav-cta btn-primary">Login</Link>
            )}
          </div>

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
            
            {/* Mobile Auth Controls inside Dropdown */}
            <li className="mobile-cta-item">
              <Link href="/#audit-teaser" className="btn-primary mobile-nav-cta" style={{ width: "100%", display: "block", textAlign: "center" }} onClick={() => setIsMenuOpen(false)}>
                Schedule
              </Link>
            </li>

            {session ? (
              <li className="mobile-cta-item" style={{ textAlign: "center" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", display: "block", marginBottom: "0.5rem" }}>Logged in as {session.user?.name}</span>
                <button onClick={() => { signOut(); setIsMenuOpen(false); }} className="btn-outline" style={{ width: "100%", display: "block", textAlign: "center" }}>Sign Out</button>
              </li>
            ) : (
              <li className="mobile-cta-item">
                <Link href="/login" className="btn-outline mobile-nav-cta" style={{ width: "100%", display: "block", textAlign: "center" }} onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-auth {
            display: none !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-cta-item {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
