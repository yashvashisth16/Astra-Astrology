document.addEventListener('DOMContentLoaded', () => {



    
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.97)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger-menu');
    const navDropdown = document.getElementById('nav-dropdown');
    
    hamburger.addEventListener('click', () => {
        navDropdown.classList.toggle('active');
        // Simple animation for bars
        const bars = hamburger.querySelectorAll('.bar');
        if (navDropdown.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // 3. Astrology Audit Teaser Logic
    const auditBtn   = document.getElementById('audit-btn');
    const auditResult = document.getElementById('audit-result');
    const resultTitle = document.getElementById('result-title');
    const resultDesc  = document.getElementById('result-desc');

    // ── Helpers ──────────────────────────────────────────────────────────────

    function showError(id, msg) {
        const field = document.getElementById(id);
        const errEl = document.getElementById(id + '-error');
        if (field)  { field.classList.add('error'); field.classList.remove('valid'); }
        if (errEl)  { errEl.textContent = msg; errEl.style.display = 'block'; }
        return false;
    }

    function clearError(id) {
        const field = document.getElementById(id);
        const errEl = document.getElementById(id + '-error');
        if (field)  { field.classList.remove('error'); }
        if (errEl)  { errEl.textContent = ''; errEl.style.display = 'none'; }
    }

    function markValid(id) {
        const field = document.getElementById(id);
        if (field) { field.classList.remove('error'); field.classList.add('valid'); }
        clearError(id);
    }

    function clearAll() {
        const ids = ['audit-name','audit-email','audit-dob','audit-time',
                     'audit-city','audit-state','audit-country',
                     'audit-type','audit-feeling','audit-element'];
        ids.forEach(id => { clearError(id); });
    }

    // Clear error on user interaction
    document.querySelectorAll('.form-input, .form-select').forEach(el => {
        el.addEventListener('input', () => {
            el.classList.remove('error');
            const errEl = document.getElementById(el.id + '-error');
            if (errEl) { errEl.style.display = 'none'; }
        });
        el.addEventListener('change', () => {
            el.classList.remove('error');
            const errEl = document.getElementById(el.id + '-error');
            if (errEl) { errEl.style.display = 'none'; }
        });
    });

    // ── Validation ───────────────────────────────────────────────────────────

    function validateForm() {
        clearAll();
        let valid = true;

        // Full Name — required, letters/spaces/hyphens only, min 2 chars
        const name = document.getElementById('audit-name').value.trim();
        if (!name) {
            valid = showError('audit-name', 'Full name is required.');
        } else if (name.length < 2) {
            valid = showError('audit-name', 'Name must be at least 2 characters.');
        } else if (!/^[a-zA-Z\s'\-]+$/.test(name)) {
            valid = showError('audit-name', 'Name may only contain letters, spaces, hyphens, or apostrophes.');
        } else { markValid('audit-name'); }

        // Email — required
        const email = document.getElementById('audit-email').value.trim();
        if (!email) {
            valid = showError('audit-email', 'Email address is required.');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
            valid = showError('audit-email', 'Please enter a valid email address (e.g. name@example.com).');
        } else { markValid('audit-email'); }

        // Date of Birth — required, must be in the past
        const dob = document.getElementById('audit-dob').value;
        if (!dob) {
            valid = showError('audit-dob', 'Date of birth is required.');
        } else {
            const dobDate = new Date(dob);
            const today   = new Date();
            today.setHours(0,0,0,0);
            if (isNaN(dobDate.getTime())) {
                valid = showError('audit-dob', 'Please enter a valid date.');
            } else if (dobDate >= today) {
                valid = showError('audit-dob', 'Date of birth must be in the past.');
            } else { markValid('audit-dob'); }
        }

        // Time of Birth — required
        const time = document.getElementById('audit-time').value;
        if (!time) {
            valid = showError('audit-time', 'Time of birth is required.');
        } else { markValid('audit-time'); }

        // City
        const city = document.getElementById('audit-city').value.trim();
        if (!city) {
            valid = showError('audit-city', 'City is required.');
        } else { markValid('audit-city'); }

        // State
        const state = document.getElementById('audit-state').value.trim();
        if (!state) {
            valid = showError('audit-state', 'State / Province is required.');
        } else { markValid('audit-state'); }

        // Country
        const country = document.getElementById('audit-country').value.trim();
        if (!country) {
            valid = showError('audit-country', 'Country is required.');
        } else { markValid('audit-country'); }

        // Dropdowns
        if (!document.getElementById('audit-type').value) {
            valid = showError('audit-type', 'Please select an area of focus.');
        } else { markValid('audit-type'); }

        if (!document.getElementById('audit-feeling').value) {
            valid = showError('audit-feeling', 'Please select your current situation.');
        } else { markValid('audit-feeling'); }

        const element = document.getElementById('audit-element').value;
        if (!element) {
            valid = showError('audit-element', 'Please select an elemental quality.');
        } else { markValid('audit-element'); }

        return { valid, element };
    }

    // ── Submit ────────────────────────────────────────────────────────────────

    if (auditBtn) {
        auditBtn.addEventListener('click', () => {
            const { valid, element } = validateForm();
            if (!valid) return;

            // Build recommendation
            const recommendations = {
                fire:  "Your profile suggests a results-oriented disposition with strong executive energy. A Predictive Transit Report would be most effective for identifying optimal windows for action and leadership initiatives.",
                water: "Your profile indicates a high degree of emotional intelligence and interpersonal sensitivity. A Natal Chart Analysis or Relationship Synastry session would provide the most meaningful insight.",
                air:   "Your profile reflects a strategic, communication-driven orientation. A Natal Chart Analysis focused on Mercury and the third and ninth house would be particularly illuminating.",
                earth: "Your profile indicates a preference for measurable, structured outcomes. An Electional Timing consultation would provide a concrete, actionable framework for your next significant decision."
            };

            auditResult.classList.remove('hidden');
            resultTitle.textContent = "Our Recommendation";
            resultTitle.style.color = 'var(--accent-gold)';
            resultTitle.style.marginBottom = '0.5rem';
            resultDesc.textContent = recommendations[element] || "";

            auditBtn.textContent = "Recommendation Received";
            auditBtn.style.backgroundColor = "transparent";
            auditBtn.style.border = "1px solid var(--accent-gold)";
            auditBtn.style.color = "var(--accent-gold)";
            auditBtn.disabled = true;
        });
    }

    // 4. Metric Counter Animation
    const metrics = document.querySelectorAll('.metric-value');
    const observerOptions = {
        threshold: 0.5
    };

    const metricObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let count = 0;
                const updateCount = () => {
                    const inc = target / 50; // Speed
                    if (count < target) {
                        count += inc;
                        entry.target.innerText = Math.ceil(count);
                        setTimeout(updateCount, 30);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (metrics.length > 0) {
        metrics.forEach(metric => {
            metricObserver.observe(metric);
        });
    }

    // 5. Portfolio Carousel (Replaced by CSS Marquee)

    // 6. Basic Star Generation for Hero Background
    function createStars() {
        const body = document.body;
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
            body.appendChild(star);
        }
    }

    // Add twinkle animation to CSS dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes twinkle {
            0% { opacity: 0.2; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 10px rgba(212, 175, 55, 0.8); }
            100% { opacity: 0.2; transform: scale(0.8); }
        }
    `;
    document.head.appendChild(style);

    // Call create stars
    createStars();

    // 7. Scroll Reveal Animation
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

    // 8. Custom Video Controls
    const iconPlay = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    const iconPause = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
    const iconMuted = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
    const iconUnmuted = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';

    const videoWrappers = document.querySelectorAll('.video-wrapper');
    videoWrappers.forEach(wrapper => {
        const video = wrapper.querySelector('video');
        const playBtn = wrapper.querySelector('.play-pause-btn');
        const muteBtn = wrapper.querySelector('.mute-unmute-btn');

        if(video && playBtn && muteBtn) {
            playBtn.addEventListener('click', () => {
                if(video.paused) {
                    video.play();
                    playBtn.innerHTML = iconPause;
                    playBtn.setAttribute('aria-label', 'Pause');
                } else {
                    video.pause();
                    playBtn.innerHTML = iconPlay;
                    playBtn.setAttribute('aria-label', 'Play');
                }
            });

            muteBtn.addEventListener('click', () => {
                if(video.muted) {
                    video.muted = false;
                    muteBtn.innerHTML = iconUnmuted;
                    muteBtn.setAttribute('aria-label', 'Mute');
                } else {
                    video.muted = true;
                    muteBtn.innerHTML = iconMuted;
                    muteBtn.setAttribute('aria-label', 'Unmute');
                }
            });
        }
    });
});
