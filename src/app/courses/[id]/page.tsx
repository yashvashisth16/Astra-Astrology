import React from 'react';
import Link from 'next/link';

// 1. Our "Fake Database" Dictionary
const MOCK_DATABASE: Record<string, any> = {
    "1": {
        title: "Vedic Astrology 101",
        description: "Master the foundational principles of reading natal charts, planetary placements, and houses.",
        price: "₹12,000",
        rating: 4.9,
        enrolled: 1250,
        whatYouWillLearn: ["Reading Natal Charts", "Understanding the 12 Houses", "Planetary Strengths", "Basic Remedies"],
        curriculum: [{ title: "Module 1: The Basics", duration: "1 hr" }, { title: "Module 2: Houses", duration: "1.5 hrs" }]
    },
    "2": {
        title: "Predictive Mastery: Dashas & Transits",
        description: "Learn how to accurately predict timing of life events using advanced planetary transit techniques.",
        price: "₹15,000",
        rating: 4.8,
        enrolled: 840,
        whatYouWillLearn: ["Vimshottari Dasha System", "Jupiter & Saturn Transits", "Timing of Marriage", "Career Transitions"],
        curriculum: [{ title: "Module 1: Dasha Rules", duration: "2 hrs" }, { title: "Module 2: Transits", duration: "2.5 hrs" }]
    },
    "3": {
        title: "Synastry & Relationship Compatibility",
        description: "Deep dive into chart matching. Learn how to analyze relationship harmony, karmic ties, and marriage timing.",
        price: "₹14,500",
        rating: 4.9,
        enrolled: 2105,
        whatYouWillLearn: ["Ashtakoot Guna Milan", "Mangal Dosha", "Navamsha Chart", "Karmic Debt in Love"],
        curriculum: [{ title: "Module 1: Match Making", duration: "1 hr" }, { title: "Module 2: Remedies", duration: "1 hr" }]
    },
    "4": {
        title: "Muhurta: The Science of Perfect Timing",
        description: "Discover Electional Astrology. Learn how to calculate the most auspicious times for weddings and business.",
        price: "₹18,000",
        rating: 5.0,
        enrolled: 630,
        whatYouWillLearn: ["Panchang Basics", "Avoiding Rahu Kaal", "Business Launch Timing", "Marriage Muhurta"],
        curriculum: [{ title: "Module 1: Panchang", duration: "1 hr" }, { title: "Module 2: Calculations", duration: "2 hrs" }]
    }
};

// 2. The Next.js 15+ Async Route Function
export default async function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {

    // Await the params
    const resolvedParams = await params;
    const courseId = resolvedParams.id;

    // Find that specific course in our fake database
    const course = MOCK_DATABASE[courseId] || MOCK_DATABASE[courseId.replace('c', '')];

    // Security check
    if (!course) {
        return (
            <div className="course-details-wrapper" style={{ textAlign: 'center', padding: '15rem 2rem 4rem 2rem' }}>
                <h2 style={{ fontFamily: 'Cinzel', fontSize: '2.5rem', marginBottom: '1rem' }}>Course Not Found</h2>
                <Link href="/courses" className="btn-buy-now" style={{ width: '200px', margin: '0 auto', display: 'block', textAlign: 'center' }}>
                    Go Back
                </Link>
            </div>
        );
    }

    // Render the beautiful page
    return (
        <main className="course-details-wrapper" style={{ padding: '10rem 2rem 4rem 2rem' }}>
            <div className="course-hero">
                <div className="course-hero-content">
                    <span className="badge">Premium Course</span>
                    <h1 className="hero-title">{course.title}</h1>
                    <p className="hero-description">{course.description}</p>
                    <div className="hero-stats">
                        <span>⭐ {course.rating}</span>
                        <span>👥 {course.enrolled} Students</span>
                    </div>
                </div>

                <div className="course-checkout-card">
                    <div className="checkout-image-placeholder">🌌</div>
                    <div className="checkout-content">
                        <h2 className="checkout-price">{course.price}</h2>
                        <p className="tax-note">Includes lifetime access & updates</p>
                        <button className="btn-buy-now">Proceed to Payment</button>
                        <p className="guarantee">🔒 Secure Checkout</p>
                    </div>
                </div>
            </div>

            <div className="course-info-section">
                <h2>What You'll Learn</h2>
                <div className="learning-grid">
                    {course.whatYouWillLearn.map((item: string, index: number) => (
                        <div key={index} className="learning-item">
                            <span className="check">✓</span>
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="course-info-section">
                <h2>Course Curriculum</h2>
                <div className="curriculum-list">
                    {course.curriculum.map((lesson: any, index: number) => (
                        <div key={index} className="lesson-row">
                            <div className="lesson-left">
                                <span className="lock-icon">🔒</span>
                                <span className="lesson-title">{lesson.title}</span>
                            </div>
                            <span className="lesson-duration">{lesson.duration}</span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}   