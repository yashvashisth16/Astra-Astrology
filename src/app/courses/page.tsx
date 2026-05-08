import React from 'react';
import CourseCard from '@/components/CourseCard';

// Dummy data to test our design before connecting the database!
const MOCK_COURSES =[
  {
    id: "1",
    title: "Vedic Astrology 101",
    description: "Master the foundational principles of reading natal charts, planetary placements, and houses.",
    rating: 4.9,
    enrolled: 1250,
    price: "₹12,000",
    image: "🌌"
  },
  {
    id: "2",
    title: "Predictive Mastery: Dashas & Transits",
    description: "Learn how to accurately predict timing of life events using advanced planetary transit techniques.",
    rating: 4.8,
    enrolled: 840,
    price: "₹15,000",
    image: "✨"
  },
  {
    id: "3",
    title: "Synastry & Relationship Compatibility",
    description: "Deep dive into chart matching. Learn how to analyze relationship harmony, karmic ties, and marriage timing.",
    rating: 4.9,
    enrolled: 2105,
    price: "₹14,500",
    image: "🤍"
  },
  {
    id: "4",
    title: "Muhurta: The Science of Perfect Timing",
    description: "Discover Electional Astrology. Learn how to calculate the most auspicious times for weddings, business launches, and major decisions.",
    rating: 5.0,
    enrolled: 630,
    price: "₹18,000",
    image: "⏳"
  }
];

export default function CoursesPage() {
    return (
        <main className="courses-page-wrapper">
            <div className="courses-header-section">
                <h1 className="courses-main-title">ACADEMY OF WISDOM</h1>
                <p className="courses-subtitle">Learn the divine science of light directly from Dr. Priti.</p>
            </div>

            <div className="courses-grid-container">
                {MOCK_COURSES.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </main>
    );
}