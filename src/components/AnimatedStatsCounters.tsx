"use client";

import { useEffect, useRef } from "react";

export default function AnimatedStatsCounters() {
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const metrics = entry.target.querySelectorAll('.metric-value');
          metrics.forEach(metric => {
            const el = metric as HTMLElement;
            const target = parseInt(el.getAttribute('data-target') || '0', 10);
            const duration = 2000;
            const step = Math.max(1, target / (duration / 16));
            let current = 0;

            const updateMetric = () => {
              current += step;
              if (current < target) {
                el.innerText = Math.floor(current).toString();
                requestAnimationFrame(updateMetric);
              } else {
                el.innerText = target.toString();
              }
            };
            updateMetric();
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="metrics-grid" ref={metricsRef}>
      <div className="metric-item reveal scale-up delay-1">
        <span className="metric-value" data-target="10">0</span><span className="suffix">k+</span>
        <p className="metric-label">Charts Completed</p>
      </div>
      <div className="metric-item reveal scale-up delay-2">
        <span className="metric-value" data-target="98">0</span><span className="suffix">%</span>
        <p className="metric-label">Client Satisfaction</p>
      </div>
      <div className="metric-item reveal scale-up delay-3">
        <span className="metric-value" data-target="15">0</span><span className="suffix">+</span>
        <p className="metric-label">Years of Practice</p>
      </div>
      <div className="metric-item reveal scale-up delay-4">
        <span className="metric-value" data-target="5">0</span><span className="suffix">★</span>
        <p className="metric-label">Average Review</p>
      </div>
    </div>
  );
}
