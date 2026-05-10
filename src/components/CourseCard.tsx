import React from 'react';
import Link from 'next/link';

interface CourseProps {
    course: {
        id: string;
        title: string;
        description: string;
        rating: number;
        enrolled: number;
        price: string;
        image: string;
        badge?: string; // <--- NEW: We made it optional with the "?"
    };
}

export default function CourseCard({ course }: CourseProps) {
    return (
        <div className="theme-course-card">

            {/* 1. Thumbnail Image (Now with Relative Positioning) */}
            <div className="theme-course-image" style={{ position: 'relative' }}>

                {/* THE NEW BADGE */}
                {course.badge && (
                    <span className="theme-badge-top-right">{course.badge}</span>
                )}

                <span className="placeholder-icon">{course.image}</span>
            </div>

            {/* 2. Card Content */}
            <div className="theme-course-content">
                <h3 className="theme-course-title">{course.title}</h3>
                <p className="theme-course-description">{course.description}</p>

                <div className="theme-course-stats">
                    <span className="stat-item">⭐ {course.rating}</span>
                    <span className="stat-item">👥 {course.enrolled} Enrolled</span>
                </div>

                <div className="theme-course-footer">
                    <span className="theme-course-price">{course.price}</span>
                    <Link href={`/courses/${course.id}`} className="theme-btn-enroll">Enroll Now</Link>
                </div>
            </div>

        </div>
    );
}