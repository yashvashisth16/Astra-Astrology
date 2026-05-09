import React from 'react';
import Link from 'next/link';
// This tells TypeScript exactly what data to expect
interface CourseProps {
    course: {
        title: string;
        description: string;
        rating: number;
        enrolled: number;
        price: string;
        image: string;
        id:string;
    };
}

export default function CourseCard({ course }: CourseProps) {
    return (
        <div className="theme-course-card">

            {/* 1. Thumbnail Image */}
            <div className="theme-course-image">
                <span className="placeholder-icon">{course.image}</span>
            </div>

            {/* 2. Card Content */}
            <div className="theme-course-content">
                <h3 className="theme-course-title">{course.title}</h3>
                <p className="theme-course-description">{course.description}</p>

                {/* 3. Stats (Stars & Enrolled) */}
                <div className="theme-course-stats">
                    <span className="stat-item">⭐ {course.rating}</span>
                    <span className="stat-item">👥 {course.enrolled} Enrolled</span>
                </div>

                {/* 4. Price & Enroll Button */}
                <div className="theme-course-footer">
                    <span className="theme-course-price">{course.price}</span>
                    <Link href={`/courses/${course.id}`} className="theme-btn-enroll">Enroll Now</Link>
                </div>
            </div>

        </div>
    );
}