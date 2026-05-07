import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand reveal from-left">
          <Link href="/" className="logo">ASTRA</Link>
          <p className="footer-tagline">Precision astrological consulting.</p>
        </div>
        <div className="footer-nav reveal from-right">
          <div className="footer-col">
            <h4>Company</h4>
            <Link href="#">About</Link>
            <Link href="#">Methodology</Link>
            <Link href="#">Contact</Link>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <Link href="#">Natal Analysis</Link>
            <Link href="#">Synastry</Link>
            <Link href="#">Electional</Link>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; 2026 Astra Astrological Consulting. All rights reserved.</p>
      </div>
    </footer>
  );
}
