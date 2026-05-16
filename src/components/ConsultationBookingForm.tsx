"use client";

import React, { useState, useEffect } from 'react';
import { createBookingEntry } from '@/app/actions/booking';
// 👇 1. Import useSession from NextAuth 👇
import { useSession } from 'next-auth/react';

export default function ConsultationBookingForm() {
  // 👇 2. Ask NextAuth for the real live session! 👇
  const { data: session, status } = useSession();
  
  // 3. Create our dynamic boolean
  const isLoggedIn = status === "authenticated";

  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<"audio" | "video" | "premium">("video");

  // 4. Set the initial form data (Start blank)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    timeOfBirth: "",
    placeOfBirth: "",
    focusArea: "",
    situation: ""
  });

  // 👇 5. THE MAGIC: When the session loads, auto-fill the form! 👇
  useEffect(() => {
    if (session?.user) {
      setFormData((prevData) => ({
        ...prevData,
        name: session.user?.name || "",
        email: session.user?.email || ""
      }));
    }
  }, [session]);

  const packages = {
    audio: { price: 500, title: "Audio Call", desc: "Quick 15-min audio consultation.", badge: null },
    video: { price: 1500, title: "Video Call (30 Mins)", desc: "Face-to-face deep dive reading.", badge: "Most Popular ✦" },
    premium: { price: 3100, title: "Premium + PDF", desc: "45-min video call + Customized remedies PDF.", badge: "Best Value" }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = async () => {
    setIsSubmitting(true);
    try {
      const response = await createBookingEntry(formData, packages[selectedPackage].title);
      if (response.success) {
        setIsSubmitting(false);
        setSuccess(true);
      } else {
        alert("Something went wrong saving your booking. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      alert("Network error.");
      setIsSubmitting(false);
    }
  };


  // ==========================================
  // SUCCESS SCREEN
  // ==========================================
  if (success) {
    return (
      <div className="booking-success-card">
        <h2>Request Received</h2>
        <p>Dr. Priti's team will contact you shortly to confirm your <strong>{packages[selectedPackage].title}</strong>.</p>
        <button onClick={() => { setSuccess(false); setStep(1); }} className="btn-outline mt-4">Book Another</button>
      </div>
    );
  }

  // ==========================================
  // STEP 2: REVIEW & SELECT PACKAGE
  // ==========================================
  if (step === 2) {
    return (
      <div className="smart-booking-wrapper">
        <div className="booking-header">
          <h2>Select Your Consultation</h2>
          <p>Choose how you would like to connect with Dr. Priti.</p>
        </div>

        <div className="package-grid">
          {(Object.keys(packages) as Array<keyof typeof packages>).map((pkgKey) => {
            const pkg = packages[pkgKey];
            const isSelected = selectedPackage === pkgKey;

            return (
              <div
                key={pkgKey}
                className={`package-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedPackage(pkgKey)}
              >
                {pkg.badge && <span className="package-badge">{pkg.badge}</span>}
                <h3>{pkg.title}</h3>
                <h2 className="package-price">₹{pkg.price.toLocaleString()}</h2>
                <p>{pkg.desc}</p>
                <div className="package-radio">
                  {isSelected ? "● Selected" : "○ Select"}
                </div>
              </div>
            );
          })}
        </div>

        <hr className="form-divider" />

        <div className="review-grid">
          <div className="review-item"><span>Name</span><p>{formData.name}</p></div>
          <div className="review-item"><span>DOB & Time</span><p>{formData.dob} at {formData.timeOfBirth}</p></div>
          <div className="review-item full-width"><span>Focus</span><p style={{ textTransform: 'capitalize' }}>{formData.focusArea}</p></div>
        </div>

        <div className="review-actions">
          <button onClick={() => setStep(1)} className="btn-outline">← Edit Details</button>

          <button onClick={handlePayment} className="btn-buy-now" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : `Pay ₹${packages[selectedPackage].price.toLocaleString()} & Book`}
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // STEP 1: THE INPUT FORM
  // ==========================================
  return (
    <div className="smart-booking-wrapper">
      <div className="booking-header">
        <h2>Schedule a Consultation</h2>
        <p>Precise, evidence-based astrological analysis.</p>
      </div>

      <form onSubmit={handleReview} className="booking-form">

        {isLoggedIn && (
          <p className="auth-alert-small" style={{ fontSize: '0.85rem', color: '#b5852a', margin: '0 0 1rem 0', fontWeight: 'bold' }}>
            ✓ Using your saved account profile
          </p>
        )}

        <div className="form-row">
          <div className="form-group">
            <label>Full Name *</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} readOnly={isLoggedIn} className={isLoggedIn ? "input-disabled" : ""} />
          </div>
          <div className="form-group">
            <label>Email Address *</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} readOnly={isLoggedIn} className={isLoggedIn ? "input-disabled" : ""} />
          </div>
        </div>

        <hr className="form-divider" />

        <h3 className="form-section-title">Birth Details</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Date of Birth *</label>
            <input type="date" name="dob" required className="custom-datetime-input" value={formData.dob} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Exact Time *</label>
            <input type="time" name="timeOfBirth" required className="custom-datetime-input" value={formData.timeOfBirth} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label>City & Country *</label>
          <input type="text" name="placeOfBirth" required placeholder="e.g. Mumbai, Maharashtra, India" value={formData.placeOfBirth} onChange={handleChange} />
        </div>

        <hr className="form-divider" />

        <h3 className="form-section-title">Consultation Focus</h3>
        <div className="form-group">
          <label>Primary Focus Area *</label>
          <select name="focusArea" required value={formData.focusArea} onChange={handleChange}>
            <option value="">Select an area...</option>
            <option value="career">Career & Financial Vocation</option>
            <option value="marriage">Marriage & Relationship Synastry</option>
            <option value="health">Medical Astrology & Health</option>
            <option value="general">General Life Prediction</option>
          </select>
        </div>

        <div className="form-group">
          <label>Current Situation / Specific Questions *</label>
          <textarea name="situation" rows={4} required placeholder="Briefly explain what you are experiencing..." value={formData.situation} onChange={handleChange}></textarea>
        </div>

        <button type="submit" className="btn-buy-now">Choose Package →</button>
      </form>
    </div>
  );
}