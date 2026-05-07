"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { submitTestimony } from "@/app/actions";

export default function SubmitTestimonyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitTestimony({ content, rating });
      alert("Thank you for your testimony! It has been submitted.");
      router.push("/testimonies");
    } catch (error) {
      console.error(error);
      alert("Failed to submit testimony. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "120px", paddingBottom: "60px" }}>
      <div className="audit-card reveal scale-up active" style={{ maxWidth: "600px", width: "100%", padding: "3rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 className="hero-headline" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Share Your Experience</h2>
          <p className="hero-subheading" style={{ fontSize: "1rem" }}>
            We'd love to hear how your consultation with Dr Priti has impacted your journey.
          </p>
        </div>
        
        <form className="audit-form" onSubmit={handleSubmit} style={{ display: "block" }}>
          <div className="audit-group">
            <label htmlFor="testimony">Your Story <span className="required-star">*</span></label>
            <textarea 
              id="testimony" 
              className="form-input" 
              style={{ minHeight: "150px", resize: "vertical" }} 
              placeholder="Write your experience here..." 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required 
            />
          </div>

          <div className="audit-group" style={{ marginTop: "1rem" }}>
            <label htmlFor="rating">Rating <span className="required-star">*</span></label>
            <select 
              id="rating" 
              className="form-input" 
              value={rating} 
              onChange={(e) => setRating(parseInt(e.target.value))}
              required
            >
              <option value="5">5 Stars - Excellent</option>
              <option value="4">4 Stars - Very Good</option>
              <option value="3">3 Stars - Good</option>
              <option value="2">2 Stars - Fair</option>
              <option value="1">1 Star - Poor</option>
            </select>
          </div>
          
          <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "1.5rem" }} disabled={loading}>
            {loading ? "Submitting..." : "Submit Testimony"}
          </button>
        </form>
      </div>
    </div>
  );
}
