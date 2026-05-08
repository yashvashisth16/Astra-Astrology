import Link from "next/link";
import ConsultationBookingForm from "@/components/ConsultationBookingForm";
import AnimatedStatsCounters from "@/components/AnimatedStatsCounters";
import { prisma } from "@/lib/prisma";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-content">
          <h1 className="hero-headline reveal">Read the Stars. <span className="highlight">Shape Your Future.</span></h1>
          <p className="hero-subheading reveal delay-1">
            Parasharr Dynasty Astrology provides precise, evidence-informed astrological analysis for individuals navigating career transitions, relationships, and major life decisions.
          </p>
          <div className="hero-actions reveal delay-2">
            <Link href="#services" className="btn-outline hero-btn">View Services</Link>
            <Link href="#audit-teaser" className="btn-primary hero-btn">Schedule a Consultation</Link>
          </div>
          <div className="hero-trust reveal delay-3">
            <span className="trust-item">Natal Analysis</span> •
            <span className="trust-item">Synastry</span> •
            <span className="trust-item">Predictive</span> •
            <span className="trust-item">Electional</span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section services">
        <div className="container">
          <h2 className="section-title reveal">Advisory Services</h2>
          <div className="services-grid">
            <div className="service-card reveal scale-up delay-1" tabIndex={0}>
              <div className="card-header">
                <span className="card-num">I</span>
                <h3>Natal Chart Analysis</h3>
              </div>
              <div className="card-body">
                <p className="summary">A comprehensive assessment of your birth chart to identify core strengths, behavioural patterns, and vocational direction.</p>
                <ul className="details">
                  <li>Career &amp; Vocation</li>
                  <li>Core Personality Structure</li>
                  <li>Long-term Karmic Patterns</li>
                </ul>
              </div>
            </div>
            <div className="service-card reveal scale-up delay-2" tabIndex={0}>
              <div className="card-header">
                <span className="card-num">II</span>
                <h3>Relationship Synastry</h3>
              </div>
              <div className="card-body">
                <p className="summary">An in-depth comparative analysis of two birth charts to assess compatibility, communication dynamics, and relational longevity.</p>
                <ul className="details">
                  <li>Compatibility Assessment</li>
                  <li>Communication Dynamics</li>
                  <li>Partnership Potential</li>
                </ul>
              </div>
            </div>
            <div className="service-card reveal scale-up delay-3" tabIndex={0}>
              <div className="card-header">
                <span className="card-num">III</span>
                <h3>Predictive Transit Report</h3>
              </div>
              <div className="card-body">
                <p className="summary">A structured forecast of significant planetary transits and progressions affecting your chart over a defined time horizon.</p>
                <ul className="details">
                  <li>Annual &amp; Multi-Year Outlooks</li>
                  <li>Critical Life Cycles</li>
                  <li>Optimal Timing Windows</li>
                </ul>
              </div>
            </div>
            <div className="service-card reveal scale-up delay-4" tabIndex={0}>
              <div className="card-header">
                <span className="card-num">IV</span>
                <h3>Electional Timing</h3>
              </div>
              <div className="card-body">
                <p className="summary">Strategic identification of the most astrologically favourable date and time for high-stakes events and commitments.</p>
                <ul className="details">
                  <li>Business Incorporations</li>
                  <li>Contracts &amp; Agreements</li>
                  <li>Marriages &amp; Major Events</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="marquee-section">
        <div className="marquee-container">
          <div className="marquee-content">
            <span>♈ Aries</span><span>♉ Taurus</span><span>♊ Gemini</span><span>♋ Cancer</span><span>♌ Leo</span><span>♍ Virgo</span><span>♎ Libra</span><span>♏ Scorpio</span><span>♐ Sagittarius</span><span>♑ Capricorn</span><span>♒ Aquarius</span><span>♓ Pisces</span>
            <span>♈ Aries</span><span>♉ Taurus</span><span>♊ Gemini</span><span>♋ Cancer</span><span>♌ Leo</span><span>♍ Virgo</span><span>♎ Libra</span><span>♏ Scorpio</span><span>♐ Sagittarius</span><span>♑ Capricorn</span><span>♒ Aquarius</span><span>♓ Pisces</span>
          </div>
        </div>
      </section>

      {/* Audit/Quiz */}
      <section id="audit-teaser" className="section audit-teaser">
        <div className="container">
          <div className="audit-card reveal scale-up">
            <div className="audit-header">
              <h3>Is an Astrological Consultation Right for You?</h3>
              <p>Answer three brief questions to help us determine the most suitable service for your current circumstances.</p>
            </div>
            <ConsultationBookingForm />
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="section process">
        <div className="container">
          <h2 className="section-title reveal">Our Methodology</h2>
          <div className="timeline">
            <div className="step reveal from-left delay-1">
              <div className="step-marker">01</div>
              <div className="step-content">
                <h4>Data Collection</h4>
                <p>We gather your exact birth date, time, and location. Precision here is foundational — even a few minutes can shift the chart meaningfully.</p>
              </div>
            </div>
            <div className="step reveal from-left delay-2">
              <div className="step-marker">02</div>
              <div className="step-content">
                <h4>Chart Construction</h4>
                <p>Using professional-grade software and classical techniques, we calculate all relevant planetary positions, aspects, and house placements.</p>
              </div>
            </div>
            <div className="step reveal from-left delay-3">
              <div className="step-marker">03</div>
              <div className="step-content">
                <h4>Analytical Synthesis</h4>
                <p>We synthesise planetary patterns, dignities, and aspects into a structured, coherent interpretation relevant to your specific objectives.</p>
              </div>
            </div>
            <div className="step reveal from-left delay-4">
              <div className="step-marker">04</div>
              <div className="step-content">
                <h4>Consultation Delivery</h4>
                <p>A focused one-to-one session in which findings are presented clearly, questions are addressed, and actionable recommendations are made.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section id="outcomes" className="section outcomes">
        <div className="container">
          <AnimatedStatsCounters />
        </div>
      </section>
    </>
  );
}
