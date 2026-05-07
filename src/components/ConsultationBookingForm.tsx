"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function ConsultationBookingForm() {
  const { data: session } = useSession();
  const [result, setResult] = useState<{ title: string; desc: string } | null>(null);

  const handleSubmit = () => {
    // Basic validation logic
    const name = (document.getElementById("audit-name") as HTMLInputElement).value;
    const email = (document.getElementById("audit-email") as HTMLInputElement).value;
    const type = (document.getElementById("audit-type") as HTMLSelectElement).value;

    if (!name || !email || !type) {
      alert("Please fill in your name, email, and primary focus area.");
      return;
    }

    // Recommendation logic matching legacy script.js
    let recommendation = { title: "", desc: "" };
    switch (type) {
      case "career":
        recommendation = {
          title: "Recommended: Natal Chart Analysis (Vocation Focus)",
          desc: "Based on your focus on professional direction, a deep dive into your midheaven, 10th house, and core vocational indicators will provide the most clarity.",
        };
        break;
      case "love":
        recommendation = {
          title: "Recommended: Relationship Synastry",
          desc: "To understand your partnership dynamics, comparing your chart with your partner's (or analyzing your 7th house natal placements) is highly advised.",
        };
        break;
      case "self":
        recommendation = {
          title: "Recommended: Comprehensive Natal Analysis",
          desc: "For personal development, understanding the foundational architecture of your birth chart is the essential first step.",
        };
        break;
      case "future":
        recommendation = {
          title: "Recommended: Predictive Transit Report",
          desc: "Since you are looking at strategic planning and timing, analyzing upcoming planetary transits and progressions will give you the roadmap you need.",
        };
        break;
      default:
        recommendation = {
          title: "Recommended: Initial Consultation",
          desc: "We recommend starting with a foundational reading to assess your current astrological climate.",
        };
    }
    setResult(recommendation);
  };

  return (
    <>
      <div className={`audit-form ${result ? 'hidden' : ''}`} id="audit-form">
        {!session && (
          <div className="audit-personal">
            <div className="audit-group">
              <label htmlFor="audit-name">Full Name <span className="required-star">*</span></label>
              <input type="text" id="audit-name" className="form-input" placeholder="e.g. Alexandra Reid" autoComplete="name" />
            </div>

            <div className="audit-group">
              <label htmlFor="audit-email">Email Address <span className="required-star">*</span></label>
              <input type="email" id="audit-email" className="form-input" placeholder="e.g. alex@example.com" autoComplete="email" />
            </div>

            <div className="audit-row">
              <div className="audit-group">
                <label htmlFor="audit-dob">Date of Birth <span className="required-star">*</span></label>
                <input type="date" id="audit-dob" className="form-input" />
              </div>
              <div className="audit-group">
                <label htmlFor="audit-time">Time of Birth <span className="required-star">*</span></label>
                <input type="time" id="audit-time" className="form-input" />
              </div>
            </div>

            <div className="audit-group">
              <label>Place of Birth <span className="required-star">*</span></label>
              <div className="audit-row audit-row-3">
                <div className="audit-group audit-group-nested">
                  <input type="text" id="audit-city" className="form-input" placeholder="City" />
                </div>
                <div className="audit-group audit-group-nested">
                  <input type="text" id="audit-state" className="form-input" placeholder="State / Province" />
                </div>
                <div className="audit-group audit-group-nested">
                  <input type="text" id="audit-country" className="form-input" placeholder="Country" />
                </div>
              </div>
            </div>
            
            <div className="audit-divider">
              <span>Consultation Preferences</span>
            </div>
          </div>
        )}

        <div className="audit-group">
          <label htmlFor="audit-type">1. What is your primary area of focus? <span className="required-star">*</span></label>
          <select id="audit-type" className="form-select" defaultValue="">
            <option value="" disabled>Select an area...</option>
            <option value="career">Career &amp; Professional Direction</option>
            <option value="love">Relationships &amp; Partnerships</option>
            <option value="self">Personal Development</option>
            <option value="future">Strategic Planning &amp; Timing</option>
          </select>
        </div>

        <div className="audit-group">
          <label htmlFor="audit-feeling">2. How would you characterise your current situation? <span className="required-star">*</span></label>
          <select id="audit-feeling" className="form-select" defaultValue="">
            <option value="" disabled>Select a situation...</option>
            <option value="stuck">Seeking clarity at a crossroads</option>
            <option value="transition">In the midst of a major transition</option>
            <option value="inspired">Ready to act, seeking optimal timing</option>
          </select>
        </div>

        <div className="audit-group">
          <label htmlFor="audit-element">3. Which elemental quality resonates most? <span className="required-star">*</span></label>
          <select id="audit-element" className="form-select" defaultValue="">
            <option value="" disabled>Select an element...</option>
            <option value="fire">Fire — Drive, ambition, leadership</option>
            <option value="earth">Earth — Stability, structure, results</option>
            <option value="air">Air — Communication, strategy, ideas</option>
            <option value="water">Water — Intuition, emotion, depth</option>
          </select>
        </div>

        <button id="audit-btn" className="btn-primary" onClick={handleSubmit} type="button">Receive Your Recommendation</button>
      </div>

      {result && (
        <div id="audit-result" className="audit-result">
          <h4 id="result-title">{result.title}</h4>
          <p id="result-desc">{result.desc}</p>
        </div>
      )}
    </>
  );
}
