import React from 'react';
import CourseCard from '@/components/CourseCard';
import EnrolledCourseCard from '@/components/EnrolledCourseCard';

// 1. Mock Storefront Data (No hardcoded badges here!)
const MOCK_STORE_COURSES = [
  { id: "1", title: "KP Astrology ", description: "Master the foundational principles...", rating: 4.9, enrolled: 1250, price: "₹12,000", image: "🌌" },
  { id: "2", title: "Predictive Mastery", description: "Learn timing of life events...", rating: 4.8, enrolled: 840, price: "₹15,000", image: "✨" },
  { id: "3", title: "Synastry & Compatibility", description: "Deep dive into chart matching...", rating: 4.9, enrolled: 105, price: "₹14,500", image: "🤍" }
];

// 2. Mock Dashboard Data (Courses the user has already bought)
const MOCK_ENROLLED_COURSES = [
  { id: "1", title: "KP Astrology ", image: "🌌", totalLessons: 12, completedLessons: 4 },
  { id: "4", title: "Muhurta: Perfect Timing", image: "⏳", totalLessons: 8, completedLessons: 8 } // 100% complete!
];

export default function CoursesPage() {
  const isLoggedIn = true;
  const userName = "Cosmic Student";

  //  THE DYNAMIC ALGORITHM: Find the highest enrolled number in the list
  const highestEnrolled = Math.max(...MOCK_STORE_COURSES.map(c => c.enrolled));

  return (
    <main className="courses-page-wrapper">

      {/* --- DASHBOARD SECTION (Only renders if logged in!) --- */}
      {isLoggedIn && (
        <section className="dashboard-section">
          <div className="dashboard-header-wrapper">
            <div className="dashboard-user-info">
              <div className="user-avatar-large">
                <span className="avatar-letter">{userName.charAt(0)}</span>
              </div>
              <div>
                <h1 className="courses-main-title" style={{ marginBottom: '5px' }}>Welcome Back, {userName}</h1>
                <p className="courses-subtitle">Your journey is 45% complete.</p>
              </div>
            </div>

            <div className="dashboard-quick-stats">
              <div className="stat-box">
                <span className="stat-number">{MOCK_ENROLLED_COURSES.length}</span>
                <span className="stat-label">Enrolled Courses</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">12</span>
                <span className="stat-label">Lessons Completed</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">1</span>
                <span className="stat-label">Certificates Earned</span>
              </div>
            </div>
          </div>

          <div className="courses-grid-container" style={{ marginBottom: '5rem' }}>
            {MOCK_ENROLLED_COURSES.map(course => (
              <EnrolledCourseCard key={course.id} course={course} />
            ))}
          </div>

          <hr className="section-divider" />
        </section>
      )}

      {/* --- STOREFRONT SECTION (Always renders) --- */}
      <section className="store-section">
        <div className="courses-header-section" style={{ textAlign: isLoggedIn ? 'left' : 'center' }}>
          <h2 className="courses-main-title" style={{ fontSize: '2rem' }}>
            {isLoggedIn ? "Explore More Courses" : "ACADEMY OF WISDOM"}
          </h2>
          <p className="courses-subtitle">Learn the divine science of light directly from Dr. Priti.</p>
        </div>

        <div className="courses-grid-container">
          {/* DYNAMIC MAPPING: Check each course against the highest enrolled number */}
          {MOCK_STORE_COURSES.map((course) => {
            const isBestseller = course.enrolled === highestEnrolled;

            // Create a temporary object to pass to the card, adding the badge only if it won
            const dynamicCourse = {
              ...course,
              badge: isBestseller ? "Bestseller ✦" : undefined
            };

            return <CourseCard key={course.id} course={dynamicCourse} />;
          })}
        </div>
      </section>

    </main>
  );
}