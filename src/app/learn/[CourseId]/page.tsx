"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// MOCK DATA: A full course curriculum
const MOCK_COURSE = {
    title: "Vedic Astrology 101",
    modules: [
        {
            title: "Module 1: The Foundations",
            lessons: [
                { id: "l1", title: "Introduction to the Cosmos", duration: "12:45", isCompleted: true, videoUrl: "placeholder" },
                { id: "l2", title: "The 12 Zodiac Signs", duration: "24:10", isCompleted: true, videoUrl: "placeholder" },
                { id: "l3", title: "Understanding the Elements", duration: "18:20", isCompleted: false, videoUrl: "placeholder" },
            ]
        },
        {
            title: "Module 2: Planetary Placements",
            lessons: [
                { id: "l4", title: "The Sun & The Moon", duration: "30:00", isCompleted: false, videoUrl: "placeholder" },
                { id: "l5", title: "Mars, Venus, & Mercury", duration: "45:15", isCompleted: false, videoUrl: "placeholder" },
            ]
        }
    ]
};

export default function LearnPage() {
    //  THE MAGIC: React State! 
    // This Remembers which lesson the user is currently watching.
    const [activeLesson, setActiveLesson] = useState(MOCK_COURSE.modules[0].lessons[2]);

    return (
        <div className="learning-theater-wrapper">

            {/* LEFT SIDE: The Video Player */}
            <div className="video-section">

                {/* Navigation Back to Dashboard */}
                <Link href="/courses" className="back-btn">← Back to Dashboard</Link>

                {/* 1. The Video Player Placeholder */}
                <div className="video-player-box">
                    <span className="play-icon">▶</span>
                    <p>Playing: {activeLesson.title}</p>
                </div>

                {/* 2. Video Details & Actions (Now side-by-side to save space!) */}
                <div className="video-details-header">
                    <h1 className="video-title">{activeLesson.title}</h1>

                    <div className="video-actions">
                        <button className="btn-resources"> Download Worksheet</button>
                        <button className="btn-mark-complete">✅ Mark as Done</button>
                    </div>
                </div>
            </div>






            {/* RIGHT SIDE: The Playlist Sidebar */}
            <div className="playlist-sidebar">
                <h2 className="sidebar-title">Course Curriculum</h2>

                {/* Loop through Modules */}
                {MOCK_COURSE.modules.map((module, mIndex) => (
                    <div key={mIndex} className="module-group">
                        <h3 className="module-title">{module.title}</h3>

                        {/* Loop through Lessons inside the Module */}
                        <div className="lesson-list">
                            {module.lessons.map((lesson) => {
                                // Check if this lesson is the one currently playing!
                                const isPlaying = activeLesson.id === lesson.id;

                                return (
                                    <div
                                        key={lesson.id}
                                        //  DYNAMIC CSS: If it's playing, add the 'active' class!
                                        className={`lesson-item ${isPlaying ? 'active-lesson' : ''}`}
                                        //  INTERACTIVITY: Clicking it changes the video!
                                        onClick={() => setActiveLesson(lesson)}
                                    >
                                        <div className="lesson-status">
                                            {isPlaying ? "▶" : lesson.isCompleted ? "✅" : "◯"}
                                        </div>
                                        <div className="lesson-info">
                                            <span className="lesson-name">{lesson.title}</span>
                                            <span className="lesson-time">{lesson.duration}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
}