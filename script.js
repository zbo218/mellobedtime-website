// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== Nav Scroll Effect =====
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
});

// ===== Hero Stars =====
const starsContainer = document.getElementById('hero-stars');
for (let i = 0; i < 60; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.setProperty('--duration', (2 + Math.random() * 4) + 's');
    star.style.animationDelay = Math.random() * 4 + 's';
    star.style.width = (2 + Math.random() * 3) + 'px';
    star.style.height = star.style.width;
    starsContainer.appendChild(star);
}

// ===== Counter Animation =====
const counters = document.querySelectorAll('.stat-number[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count);
            const duration = 1500;
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(target * eased);
                if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ===== Phone Trio Scroll Throw Effect =====
const phoneTrio = document.querySelector('.phone-duo');
const heroVisual = document.querySelector('.hero-visual');
const heroSection = document.querySelector('.hero');
let thrown = false;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    const throwPoint = heroHeight * 0.6;

    if (scrollY > throwPoint && !thrown) {
        thrown = true;
        heroVisual.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease';
        heroVisual.style.transform = 'translateX(120vw) rotate(20deg)';
        heroVisual.style.opacity = '0';
    } else if (scrollY <= throwPoint * 0.4 && thrown) {
        thrown = false;
        heroVisual.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease';
        heroVisual.style.transform = '';
        heroVisual.style.opacity = '';
    }

    // Subtle parallax before throw
    if (!thrown && scrollY < heroHeight) {
        const progress = scrollY / heroHeight;
        heroVisual.style.transform = `translateY(${scrollY * 0.08}px)`;
    }
});
