import React from 'react';
import Link from 'next/link';

interface EnrolledCourseProps {
    course: {
        id: string;
        title: string;
        image: string;
        totalLessons: number;
        completedLessons: number;
    };
}

export default function EnrolledCourseCard({ course }: EnrolledCourseProps) {
    // UNDER THE HOOD: Math to calculate the width of the progress bar!
    const progressPercentage = Math.round((course.completedLessons / course.totalLessons) * 100);

    // Dynamic Button Text
    const buttonText = course.completedLessons === 0 ? "Start Course" : "Resume Learning";

    return (
        <div className="theme-course-card">
            <div className="theme-course-image" style={{ height: '150px' }}>
                <span className="placeholder-icon">{course.image}</span>
            </div>

            <div className="theme-course-content">
                <h3 className="theme-course-title" style={{ fontSize: '1.1rem' }}>{course.title}</h3>

                {/* THE PROGRESS TRACKER */}
                <div className="progress-section">
                    <div className="progress-text">
                        <span>{progressPercentage}% Complete</span>
                        <span>{course.completedLessons} / {course.totalLessons} Lessons</span>
                    </div>

                    {/* The Bar Background */}
                    <div className="progress-bar-bg">
                        {/* The Gold Fill (Width is dynamic based on their progress!) */}
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>

                <div className="theme-course-footer" style={{ marginTop: 'auto' }}>
                    <Link href={`/learn/${course.id}`} className="theme-btn-enroll w-full text-center">
                        {buttonText}
                    </Link>
                </div>
            </div>
        </div>
    );
}