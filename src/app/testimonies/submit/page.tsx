"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SubmitTestimonyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your testimony! It has been submitted for review.");
    router.push("/testimonies");
  };

  return (
    <div className="container" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "120px", paddingBottom: "60px" }}>
      <div className="audit-card reveal scale-up active" style={{ maxWidth: "600px", width: "100%", padding: "3rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 className="hero-headline" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Share Your Experience</h2>
          <p className="hero-subheading" style={{ fontSize: "1rem" }}>
            We'd love to hear how your consultation with Astra has impacted your journey.
          </p>
        </div>
        
        <form className="audit-form" onSubmit={handleSubmit} style={{ display: "block" }}>
          <div className="audit-group">
            <label htmlFor="testimony">Your Story <span className="required-star">*</span></label>
            <textarea id="testimony" className="form-input" style={{ minHeight: "150px", resize: "vertical" }} placeholder="Write your experience here..." required></textarea>
          </div>
          
          <div className="audit-group" style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "1rem" }}>
            <input type="checkbox" id="anonymous" style={{ accentColor: "var(--light-accent)", width: "18px", height: "18px" }} />
            <label htmlFor="anonymous" style={{ marginBottom: "0", fontSize: "0.9rem", color: "var(--light-text)" }}>Keep my testimony anonymous</label>
          </div>

          <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "1.5rem" }}>Submit Testimony</button>
        </form>
      </div>
    </div>
  );
}
