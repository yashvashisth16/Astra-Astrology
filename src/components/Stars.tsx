"use client";

import { useEffect } from "react";

export default function Stars() {
  useEffect(() => {
    function createStars() {
      const container = document.getElementById("star-container");
      if (!container) return;
      
      container.innerHTML = ""; // Prevent duplicates in React strict mode
      
      for(let i=0; i<40; i++) {
          let star = document.createElement('div');
          star.className = 'star-particle';
          star.style.position = 'absolute';
          star.style.left = Math.random() * 100 + 'vw';
          star.style.top = Math.random() * 100 + 'vh';
          const size = Math.random() * 2.5 + 'px';
          star.style.width = size;
          star.style.height = size;
          star.style.backgroundColor = `rgba(184,136,42,${Math.random() * 0.4 + 0.1})`;
          star.style.borderRadius = '50%';
          star.style.zIndex = '-1';
          star.style.animation = `twinkle ${Math.random() * 5 + 3}s infinite linear`;
          container.appendChild(star);
      }
    }
    createStars();
  }, []);

  return (
    <>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div id="star-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}></div>
    </>
  );
}
