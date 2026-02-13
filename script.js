// ===== script.js =====
// VANILLA JAVASCRIPT – NO FRAMEWORKS

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ---------- 1. HERO SLIDER ----------
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;

    // create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.dataset.slide = i;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function goToSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() { goToSlide(currentSlide + 1); }
    function prevSlide() { goToSlide(currentSlide - 1); }

    nextBtn?.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    prevBtn?.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    function resetInterval() {
        clearInterval(slideInterval);
        startAutoSlide();
    }
    startAutoSlide();

    // ---------- 2. MOBILE MENU TOGGLE ----------
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ---------- 3. EMI CALCULATOR ----------
    const calculateBtn = document.getElementById('calculateEmi');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function(e) {
            e.preventDefault();

            const carPrice = parseFloat(document.getElementById('carPrice').value);
            const downPayment = parseFloat(document.getElementById('downPayment').value) || 0;
            const annualRate = parseFloat(document.getElementById('interestRate').value);
            const years = parseFloat(document.getElementById('loanTenure').value);
            const emiResult = document.getElementById('emiValue');

            if (isNaN(carPrice) || carPrice <= 0) {
                emiResult.innerText = '❌ Valid car price';
                return;
            }
            if (isNaN(annualRate) || annualRate < 0) {
                emiResult.innerText = '❌ Enter interest rate';
                return;
            }
            if (isNaN(years) || years <= 0) {
                emiResult.innerText = '❌ Enter years > 0';
                return;
            }
            if (downPayment >= carPrice) {
                emiResult.innerText = '⚠️ Down payment too high';
                return;
            }

            const principal = carPrice - downPayment;
            const monthlyRate = annualRate / 12 / 100;
            const months = years * 12;

            let emi = 0;
            if (monthlyRate === 0) {
                emi = principal / months;
            } else {
                const factor = Math.pow(1 + monthlyRate, months);
                emi = principal * monthlyRate * factor / (factor - 1);
            }

            if (isFinite(emi)) {
                emiResult.innerText = `$ ৳{emi.toFixed(2)}`;
            } else {
                emiResult.innerText = '❌ Calculation error';
            }
        });
    }

    // ---------- 4. TESTIMONIAL SLIDER ----------
    const testimonialSlides = document.querySelectorAll('.testimonial');
    const testimonialDots = document.querySelectorAll('.testimonial-controls .dot');

    if (testimonialDots.length) {
        testimonialDots.forEach((dot, idx) => {
            dot.addEventListener('click', function() {
                testimonialSlides.forEach(s => s.classList.remove('active'));
                testimonialDots.forEach(d => d.classList.remove('active'));
                testimonialSlides[idx].classList.add('active');
                dot.classList.add('active');
            });
        });
    }


    let currentIndex = 0;

    function nextSlide() {
        testimonialSlides.forEach(s => s.classList.remove('active'));
        testimonialDots.forEach(d => d.classList.remove('active'));

        currentIndex = (currentIndex + 1) % testimonialSlides.length;

        testimonialSlides[currentIndex].classList.add('active');
        testimonialDots[currentIndex].classList.add('active');
}

// Auto-slide every 4 seconds
setInterval(nextSlide, 4000);


    // ---------- 5. SCROLL REVEAL ANIMATION ----------
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.15, rootMargin: '0px' });

        revealElements.forEach(el => observer.observe(el));
    }

    // ---------- 6. 3D TILT EFFECT FOR SUV CARDS ----------
    const tiltCards = document.querySelectorAll('.card-tilt');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // ---------- 7. PREVENT NEGATIVE INPUTS ----------
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === '-' || e.key === 'e') e.preventDefault();
        });
    });

    // ---------- 8. SMOOTH SCROLL ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---------- 9. INIT TESTIMONIAL ACTIVE ----------
    if (testimonialSlides.length) {
        testimonialSlides[0].classList.add('active');
    }

});
