"use client";

import React, { useState } from 'react';

export default function ConsultationBookingForm() {
  //  MOCK AUTH STATE: Change this to 'false' to see the Name/Email fields appear!
  const isLoggedIn = true;
  const userName = "Cosmic Student";

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fake Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate database save delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="booking-success-card">
        <h2>Request Received</h2>
        <p>Dr. Priti's team will review your chart details and contact you via email with available consultation slots.</p>
        <button onClick={() => setSuccess(false)} className="btn-outline mt-4">Book Another</button>
      </div>
    );
  }

  return (
    <div className="smart-booking-wrapper">
      <div className="booking-header">
        <h2>Schedule a Consultation</h2>
        <p>Precise, evidence-based astrological analysis.</p>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">

        {/* CONTACT DETAILS */}
        <div className="form-row">
          <div className="form-group">
            <label>Full Name *</label>
            <input 
              type="text" 
              required 
              placeholder="Enter your full name" 
              defaultValue={isLoggedIn ? userName : ""}
              readOnly={isLoggedIn}
            />
          </div>
          <div className="form-group">
            <label>Email Address *</label>
            <input 
              type="email" 
              required 
              placeholder="Enter your email" 
              defaultValue={isLoggedIn ? "student@cosmos.com" : ""}
              readOnly={isLoggedIn}
            />
          </div>
        </div>

        <hr className="form-divider" />

        {/* BIRTH DETAILS */}
        <h3 className="form-section-title">Birth Details</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Date of Birth *</label>
            <input type="date" required className="custom-datetime-input" />
          </div>
          <div className="form-group">
            <label>Exact Time *</label>
            <input type="time" required className="custom-datetime-input" />
          </div>
        </div>
        <div className="form-group">
          <label>City & Country *</label>
          <input type="text" required placeholder="e.g. Mumbai, Maharashtra, India" />
        </div>

        <hr className="form-divider" />

        {/* CONSULTATION DETAILS */}
        <h3 className="form-section-title">Consultation Focus</h3>
        <div className="form-group">
          <label>Primary Focus Area *</label>
          <select required>
            <option value="">Select an area...</option>
            <option value="career">Career & Financial Vocation</option>
            <option value="marriage">Marriage & Relationship Synastry</option>
            <option value="health">Medical Astrology & Health</option>
            <option value="general">General Life Prediction (1 Year)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Current Situation / Specific Questions *</label>
          <textarea
            rows={4}
            required
            placeholder="Briefly explain what you are experiencing and what specific answers you are seeking from this reading..."
          ></textarea>
        </div>

        {/* SUBMIT BUTTON */}
        <button type="submit" className="btn-buy-now" disabled={isSubmitting}>
          {isSubmitting ? "Submitting Request..." : "Request Consultation"}
        </button>
        <p className="privacy-note">Your data is kept strictly confidential.</p>
      </form>
    </div>
  );
}