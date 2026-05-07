"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally save to the database (Supabase/Postgres)
    // For now, we simulate saving and redirecting to home
    alert("Astrological Profile Saved Successfully!");
    router.push("/");
  };

  return (
    <div className="container" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "120px", paddingBottom: "60px" }}>
      <div className="audit-card reveal scale-up active" style={{ maxWidth: "600px", width: "100%", padding: "3rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 className="hero-headline" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Complete Your Profile</h2>
          <p className="hero-subheading" style={{ fontSize: "1rem" }}>
            Welcome{session?.user?.name ? `, ${session.user.name}` : ""}! Please provide your birth details to generate your astrological profile. You'll never have to enter this again.
          </p>
        </div>
        
        <form className="audit-form" onSubmit={handleSaveProfile} style={{ display: "block" }}>
          <div className="audit-personal">
            <div className="audit-row">
              <div className="audit-group">
                <label htmlFor="dob">Date of Birth <span className="required-star">*</span></label>
                <input type="date" id="dob" className="form-input" required />
              </div>
              <div className="audit-group">
                <label htmlFor="time">Time of Birth <span className="required-star">*</span></label>
                <input type="time" id="time" className="form-input" required />
              </div>
            </div>

            <div className="audit-group">
              <label>Place of Birth <span className="required-star">*</span></label>
              <div className="audit-row audit-row-3">
                <div className="audit-group audit-group-nested">
                  <input type="text" id="city" className="form-input" placeholder="City" required />
                </div>
                <div className="audit-group audit-group-nested">
                  <input type="text" id="state" className="form-input" placeholder="State / Province" required />
                </div>
                <div className="audit-group audit-group-nested">
                  <input type="text" id="country" className="form-input" placeholder="Country" required />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "1.5rem" }}>Save My Profile</button>
        </form>
      </div>
    </div>
  );
}
