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
});
