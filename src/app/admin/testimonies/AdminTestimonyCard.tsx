"use client";

import { useState } from "react";
import { toggleTestimonyApproval } from "@/app/actions";

export default function AdminTestimonyCard({ testimony }: { testimony: any }) {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      await toggleTestimonyApproval(testimony.id, !testimony.isApproved);
    } catch (error) {
      console.error(error);
      alert("Failed to update status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="testimony-card text-card" style={{ border: `1px solid ${testimony.isApproved ? "#16a34a" : "var(--accent-gold)"}` }}>
      <div className="text-testimony-content" style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <div style={{ color: "var(--light-accent)", fontSize: "1.2rem" }}>
              {"★".repeat(testimony.rating)}{"☆".repeat(5 - testimony.rating)}
            </div>
            <span style={{ 
              fontSize: "0.8rem", 
              padding: "0.25rem 0.5rem", 
              borderRadius: "4px", 
              background: testimony.isApproved ? "rgba(22, 163, 74, 0.1)" : "rgba(220, 38, 38, 0.1)",
              color: testimony.isApproved ? "#16a34a" : "#dc2626"
            }}>
              {testimony.isApproved ? "Approved" : "Pending Review"}
            </span>
          </div>
          <p className="quote" style={{ fontSize: "1.1rem", fontStyle: "italic", lineHeight: "1.6" }}>"{testimony.content}"</p>
        </div>
        
        <div style={{ marginTop: "1.5rem" }}>
          <p className="author" style={{ fontWeight: "bold", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1rem" }}>
            - {testimony.user.name || "Anonymous Client"}
          </p>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1rem" }}>{testimony.user.email}</p>
          
          <button 
            onClick={handleToggle} 
            className="btn-primary" 
            style={{ 
              width: "100%", 
              background: testimony.isApproved ? "#dc2626" : "#16a34a",
              color: "#fff",
              padding: "0.5rem",
              fontSize: "0.9rem"
            }}
            disabled={loading}
          >
            {loading ? "Updating..." : testimony.isApproved ? "Reject & Hide" : "Approve & Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
