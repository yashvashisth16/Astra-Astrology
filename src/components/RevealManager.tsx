"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    // Wait a brief moment to ensure Next.js has fully rendered the new page DOM
    const timeoutId = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal');
      const revealOptions = {
          threshold: 0.15,
          rootMargin: "0px 0px -50px 0px"
      };

      const revealObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('active');
                  observer.unobserve(entry.target);
              }
          });
      }, revealOptions);

      revealElements.forEach(el => {
          revealObserver.observe(el);
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
