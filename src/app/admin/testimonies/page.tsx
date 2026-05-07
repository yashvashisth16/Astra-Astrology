import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminTestimonyCard from "./AdminTestimonyCard";

export const dynamic = "force-dynamic";

export default async function AdminTestimonies() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.email !== "yashvashisth70@gmail.com") {
    redirect("/"); // Kick out non-admins
  }

  const testimonies = await prisma.testimony.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container" style={{ minHeight: "80vh", paddingTop: "120px", paddingBottom: "60px" }}>
      <h1 className="section-title">Admin Dashboard: Review Testimonies</h1>
      <p style={{ textAlign: "center", marginBottom: "2rem", color: "var(--text-muted)" }}>
        Approve testimonies so they appear on the public Case Studies page. Only testimonies with a rating of 4 or higher will be shown.
      </p>

      <div className="testimonies-grid">
        {testimonies.map((testimony: any) => (
          <AdminTestimonyCard key={testimony.id} testimony={testimony} />
        ))}
        {testimonies.length === 0 && (
          <p style={{ textAlign: "center", gridColumn: "1 / -1", color: "var(--text-muted)" }}>No testimonies submitted yet.</p>
        )}
      </div>
    </div>
  );
}
