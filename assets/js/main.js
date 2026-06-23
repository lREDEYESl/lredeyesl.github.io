document.addEventListener('DOMContentLoaded', () => {

    // â”€â”€ ELEMENTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const navbar      = document.getElementById('navbar');
    const navProgress = document.getElementById('navProgress');
    const hamburger   = document.getElementById('hamburger');
    const mobileMenu  = document.getElementById('mobileMenu');
    const backToTop   = document.getElementById('backToTop');
    const topstrip    = document.querySelector('.topstrip');
    const navLinks    = document.querySelectorAll('.nav-link[href^="#"]');
    const mobLinks    = document.querySelectorAll('.mob-link[href^="#"]');
    const units       = document.querySelectorAll('main section.unit');

    // â”€â”€ AOS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (window.AOS) {
        window.AOS.init({
            duration: 600,
            easing: 'ease-out-cubic',
            once: true,
            offset: 70
        });
    }

    // â”€â”€ SMOOTH SCROLL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    function smoothScroll(href) {
        const id = href.substring(1);
        const target = document.getElementById(id);
        if (!target) return;

        const navH = navbar?.offsetHeight ?? 0;
        const pos  = target.getBoundingClientRect().top + window.scrollY - navH - 24;

        window.scrollTo({ top: pos, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            smoothScroll(link.getAttribute('href'));
        });
    });

    mobLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            closeMobileMenu();
            setTimeout(() => smoothScroll(link.getAttribute('href')), 320);
        });
    });

    // â”€â”€ MOBILE MENU â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    function openMobileMenu() {
        mobileMenu.classList.add('open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        hamburger.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    hamburger?.addEventListener('click', () => {
        if (mobileMenu.classList.contains('open')) closeMobileMenu();
        else openMobileMenu();
    });

    // Close on ESC
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeMobileMenu();
    });

    // â”€â”€ SCROLL HANDLER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    let ticking = false;

    function onScroll() {
        const y = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;

        // 1. Progress bar
        if (navProgress) {
            navProgress.style.width = `${(y / docH) * 100}%`;
        }

        // 2. Navbar shadow
        if (navbar) {
            if (y > 10) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        }

        // 3. Topstrip collapse
        if (topstrip) {
            if (y > 30) topstrip.classList.add('collapsed');
            else topstrip.classList.remove('collapsed');
        }

        // 4. Scroll spy â€“ active nav link (por Unidad)
        const navH = navbar?.offsetHeight ?? 0;
        let current = '';

        units.forEach(section => {
            const top = section.offsetTop;
            if (y >= top - navH - 80) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const section = link.dataset.section;
            if (section && section === current) {
                link.classList.add('active');
            }
        });

        // 5. Back to top button
        if (backToTop) {
            if (y > 500) backToTop.classList.add('visible');
            else backToTop.classList.remove('visible');
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    // Initial call
    onScroll();

    // â”€â”€ BACK TO TOP â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // â”€â”€ SERVICE BARS ANIMATION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // Animate the service model bars when they enter the viewport
    const ssBars = document.querySelectorAll('.ss-fill');

    if ('IntersectionObserver' in window && ssBars.length) {
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const parent = bar.closest('.ss-bar');
                    if (parent) {
                        // Trigger CSS transition
                        bar.style.width = parent.style.getPropertyValue('--w') || '50%';
                    }
                    barObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.3 });

        ssBars.forEach(bar => {
            const parent = bar.closest('.ss-bar');
            if (parent) {
                const targetW = getComputedStyle(parent).getPropertyValue('--w').trim();
                bar.style.width = '0%';
                setTimeout(() => barObserver.observe(bar), 100);
            }
        });
    }

});
