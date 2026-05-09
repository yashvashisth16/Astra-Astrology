"use client";

import { useState } from "react";

export default function TestimonialCarousel({ testimonies }: { testimonies: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonies || testimonies.length === 0) {
    return <p className="text-center" style={{ color: "var(--text-muted)" }}>No reviews yet. Be the first to leave one!</p>;
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3 >= testimonies.length ? 0 : prev + 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 3 < 0 ? Math.max(0, testimonies.length - (testimonies.length % 3 === 0 ? 3 : testimonies.length % 3)) : prev - 3));
  };

  // Get exactly 3 testimonies to display
  const visibleTestimonies = testimonies.slice(currentIndex, currentIndex + 3);

  return (
    <div className="testimonial-carousel-wrapper" style={{ position: "relative" }}>
      <div className="services-grid" style={{ marginBottom: "3rem" }}>
        {visibleTestimonies.map((testimony, index) => (
          <div key={`${testimony.id}-${index}`} className="testimony-carousel-card reveal scale-up active" tabIndex={0} style={{ animationDelay: `${index * 0.15}s` }}>
            <div className="card-header">
              <span className="card-num" style={{ letterSpacing: "4px" }}>
                {"★".repeat(testimony.rating)}
              </span>
              <h3 style={{ margin: 0, fontSize: "0.95rem", color: "var(--accent-gold)" }}>
                {testimony.user?.name || "Client"}
              </h3>
            </div>
            <div className="card-body">
              <p className="summary" style={{ fontStyle: "italic", color: "var(--text-main)", lineHeight: 1.7, marginBottom: 0 }}>
                "{testimony.content}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {testimonies.length > 3 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <button onClick={prevSlide} className="btn-outline">
            &#8592; Previous
          </button>
          <button onClick={nextSlide} className="btn-outline">
            Next &#8594;
          </button>
        </div>
      )}
    </div>
  );
}
