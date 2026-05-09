import React from 'react';
import CourseCard from '@/components/CourseCard';
import EnrolledCourseCard from '@/components/EnrolledCourseCard';

// 1. Mock Storefront Data
const MOCK_STORE_COURSES = [
  { id: "1", title: "Vedic Astrology 101", description: "Master the foundational principles...", rating: 4.9, enrolled: 1250, price: "₹12,000", image: "🌌" },
  { id: "2", title: "Predictive Mastery", description: "Learn timing of life events...", rating: 4.8, enrolled: 840, price: "₹15,000", image: "✨" },
  { id: "3", title: "Synastry & Compatibility", description: "Deep dive into chart matching...", rating: 4.9, enrolled: 2105, price: "₹14,500", image: "🤍" }
];

// 2. Mock Dashboard Data
const MOCK_ENROLLED_COURSES = [
  { id: "1", title: "Vedic Astrology 101", image: "🌌", totalLessons: 12, completedLessons: 4 },
  { id: "4", title: "Muhurta: Perfect Timing", image: "⏳", totalLessons: 8, completedLessons: 8 }
];

export default function CoursesPage() {
  const isLoggedIn = false;
  const userName = "Cosmic Student";

  return (
    <main className="courses-page-wrapper">

      {/* --- DASHBOARD SECTION (Only renders if logged in!) --- */}
      {isLoggedIn && (
        <section className="dashboard-section">

          {/* THE NEW PREMIUM DASHBOARD HEADER */}
          <div className="dashboard-header-wrapper">

            {/* User Profile Avatar & Welcome Text */}
            <div className="dashboard-user-info">
              <div className="user-avatar-large">
                <span className="avatar-letter">{userName.charAt(0)}</span>
              </div>
              <div>
                <h1 className="courses-main-title" style={{ marginBottom: '5px' }}>Welcome Back, {userName}</h1>
                <p className="courses-subtitle">Your journey is 45% complete.</p>
              </div>
            </div>

            {/* Quick Stats Cards */}
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

          {/* Enrolled Courses Grid */}
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
          {MOCK_STORE_COURSES.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

    </main>
  );
}