# Parasharr Divine Astrology — Ultimate Master Project Checklist

Here is your **Ultimate Master Project Checklist**.  
I have combined everything into a single, professional roadmap. You can copy and paste this into your project's README.md file or a Notion document. This is exactly what a Tech Lead looks at when managing a full-stack application.

## 🔑 Legend
- ✅ **Dynamic / Done** (Fully wired to the database & working)
- ⚠️ **Hardcoded / UI Done** (Looks perfect, but uses fake data)

---

## 🌐 1. Global Infrastructure & Security
- [x] ✅ **Database Architecture:** Supabase PostgreSQL setup with Prisma ORM.
- [x] ✅ **IPv4 Network Fix:** Prisma pg adapter configured for Vercel deployment.
- [x] ✅ **Authentication Backend:** Google OAuth (NextAuth) successfully logging users in.
- [x] ✅ **Authentication Frontend:** Connect getServerSession so the UI changes automatically when a user logs in or out.
- [ ] ⏳ **Global User State:** Automatically hide "Sign In" and show "Dashboard" in the Navbar based on auth state.

## 🏠 2. Core Pages & Marketing
- [x] ✅ **Design System:** Custom Dark/Light theme, Cinzel font, and Parasharr Gold aesthetic.
- [x] ✅ **Homepage UI:** Hero section, Zodiac marquee, and services grid.
- [x] ✅ **Testimonies Logic (Dynamic):** Fetches top 5 *approved* reviews directly from Supabase.
- [x] ✅ **Testimonies Submission (Dynamic):** Form that securely sends user reviews to the database with isApproved: false.

## 📚 3. The LMS (Learning Management System)
- [ ] ⚠️ **Courses Storefront (/courses):** UI grid built, Bestseller algorithm written, but reading from MOCK_STORE_COURSES.
- [ ] ⏳ **Dynamic Storefront:** Fetch real courses via await prisma.course.findMany().
- [ ] ⚠️ **Course Sales Page (/courses/[id]):** UI built with locked curriculum, reading from MOCK_DATABASE.
- [ ] ⏳ **Dynamic Sales Page:** Fetch specific course via await prisma.course.findUnique().
- [ ] ⚠️ **Student Dashboard:** UI built with Progress Bars and Quick Stats, reading from MOCK_ENROLLED_COURSES.
- [ ] ⏳ **Dynamic Dashboard:** Fetch courses based on the logged-in User's ID and calculate real progress.
- [ ] ⚠️ **Learning Theater (/learn/[courseId]):** UI built (70/30 split screen) with React useState video switching.
- [ ] ⏳ **Dynamic Theater & Progress Tracking:** Fetch real video URLs. Build Server Action so clicking "✅ Mark as Done" updates the UserProgress database table.

## 💳 4. Payments & Commerce
- [ ] ⏳ **Database Purchase Tracking:** Create a Purchase table to track who owns which course.
- [x] ✅ **Payment Integration (Razorpay/Stripe):** Connect the "Proceed to Payment" button to a real checkout gateway (Razorpay integrated!).
- [ ] ⏳ **Content Gate (Security):** Add logic to /learn/[courseId] to block users who haven't purchased the course from watching the videos.

## 🗓️ 5. Astrology Consulting Services
- [x] ✅ **Smart Booking Form UI:** Build a multi-step form to collect Birth Time, Birth City, and Consultation Topic.
- [x] ✅ **Auto-Fill Auth Logic:** If the user is logged in, automatically hide/fill the Name and Email fields to reduce friction.
- [x] ✅ **Booking Database Save:** Send the completed booking request to the database.
- [ ] ⏳ **User Profile (/profile):** A private settings page where users can permanently save their Date/Time/Location of birth so they never have to type it again.

## 👑 6. Admin & Operations
- [x] ✅ **Manual Content Moderation:** Ability to approve testimonies and add courses via the Supabase Dashboard.
- [ ] ⏳ **Secret Admin Portal (/admin):** A protected Next.js page only Dr. Priti can access to approve reviews, add video URLs, and view incoming booking requests without leaving the website.