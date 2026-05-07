import Image from "next/image";
import Link from "next/link";
import VideoPlayer from "@/components/VideoPlayer";

export default function Testimonies() {
  return (
    <>
      {/* Hero */}
      <section className="hero page-hero">
        <div className="container hero-content">
          <h1 className="hero-headline reveal">Client <span className="highlight">Testimonies</span></h1>
          <p className="hero-subheading reveal delay-1">
            Real stories of transformation, clarity, and strategic growth guided by astrological insight.
          </p>
        </div>
      </section>

      {/* Text & Image Testimonies */}
      <section className="section testimonies-text">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }} className="reveal">
            <h2 className="section-title" style={{ marginBottom: 0 }}>Client Experiences</h2>
            <Link href="/testimonies/submit" className="btn-primary" style={{ padding: "0.5rem 1.5rem", fontSize: "0.9rem" }}>
              Submit a Case Study
            </Link>
          </div>
          <div className="testimonies-grid">
            <div className="testimony-card reveal scale-up delay-1">
              <img src="/testinomy/WhatsApp Image 2026-05-06 at 7.20.22 PM.jpeg" alt="Client testimony screenshot" className="testimony-img" />
            </div>
            <div className="testimony-card reveal scale-up delay-2">
              <img src="/testinomy/WhatsApp Image 2026-05-06 at 7.20.23 PM (1).jpeg" alt="Client testimony screenshot" className="testimony-img" />
            </div>
            <div className="testimony-card reveal scale-up delay-3">
              <img src="/testinomy/WhatsApp Image 2026-05-06 at 7.20.23 PM.jpeg" alt="Client testimony screenshot" className="testimony-img" />
            </div>
            <div className="testimony-card reveal scale-up delay-4">
              <img src="/testinomy/testimony(nikita-1).jpeg" alt="Client testimony screenshot" className="testimony-img" />
            </div>
            <div className="testimony-card reveal scale-up delay-5">
              <img src="/testinomy/testimony(nikita-2).jpeg" alt="Client testimony screenshot" className="testimony-img" />
            </div>
            <div className="testimony-card reveal scale-up delay-6">
              <img src="/testinomy/WhatsApp Image 2026-05-07 at 6.33.13 AM.jpeg" alt="Client testimony screenshot" className="testimony-img" />
            </div>
            <div className="testimony-card text-card reveal scale-up delay-7">
              <div className="text-testimony-content">
                <p className="quote">"I am Mrs. Pratibha Sharma from Noida. I was really concerned about my daughter's concentration in class 9th and she was distracted from her studies. Soon I got in contact with Dr. Priti Parasharr and she guided me with some puja and a ring for my daughter and within 30 days I observed changes in her concentration and determination in her studies. Also she got good percentage in her class 10th boards. Her approach was calm, friendly, and easy to understand and has helped me."</p>
                <p className="author">- Mrs. Pratibha Sharma</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonies */}
      <section className="section testimonies-video" id="video-testimonies">
        <div className="container">
          <h2 className="section-title reveal">Video Testimonies</h2>
          <div className="video-grid">
            <VideoPlayer src="/testinomy/WhatsApp Video 2026-05-07 at 6.30.41 AM.mp4" delay={1} />
          </div>
        </div>
      </section>
    </>
  );
}
