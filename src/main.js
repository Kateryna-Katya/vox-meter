/**
 * VOX-METER.BLOG - Core Script 2026
 * Все модули: Меню, Hero, Swiper, AI Terminal, Forms, Cookies
 */

window.addEventListener('load', () => {
    console.log("Система Vox-Meter инициализирована.");

    // 0. Регистрация плагинов GSAP
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК (Lucide)
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. МОБИЛЬНОЕ МЕНЮ
    const initMobileMenu = () => {
        const burger = document.getElementById('burger');
        const menu = document.getElementById('mobile-menu-overlay');
        const links = document.querySelectorAll('.mobile-nav__link');

        if (!burger || !menu) return;

        const toggle = () => {
            burger.classList.toggle('is-active');
            menu.classList.toggle('is-active');
            document.body.style.overflow = menu.classList.contains('is-active') ? 'hidden' : '';
        };

        burger.addEventListener('click', toggle);
        links.forEach(link => link.addEventListener('click', toggle));
    };

    // 3. ЭФФЕКТ ХЕДЕРА ПРИ СКРОЛЛЕ
    const initHeader = () => {
        const header = document.getElementById('header');
        if (!header) return;
        
        window.addEventListener('scroll', () => {
            header.classList.toggle('header--scrolled', window.scrollY > 50);
        });
    };

    // 4. ГАРАНТИРОВАННАЯ АНИМАЦИЯ HERO
    const initHeroAnimation = () => {
        const title = document.querySelector('.animate-title');
        const fadeElements = document.querySelectorAll('.fade-in-hero');

        if (!title) return;

        // Принудительно показываем заголовок (защита от багов)
        gsap.set(title, { opacity: 1, visibility: 'visible' });

        const tl = gsap.timeline();

        // Анимация появления заголовка
        tl.from(title, {
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
            clearProps: "all" // Очищает стили GSAP после завершения
        });

        // Анимация остальных элементов Hero
        if (fadeElements.length > 0) {
            tl.to(fadeElements, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out"
            }, "-=0.6");
        }
    };

    // 5. ИНИЦИАЛИЗАЦИЯ SWIPER (КЕЙСЫ)
    const initCasesSlider = () => {
        const sliderEl = document.querySelector('.cases-slider');
        if (sliderEl && typeof Swiper !== 'undefined') {
            new Swiper('.cases-slider', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                speed: 800,
                autoplay: { delay: 4000, disableOnInteraction: false },
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: { 
                    nextEl: '.swiper-button-next', 
                    prevEl: '.swiper-button-prev' 
                },
                breakpoints: {
                    768: { slidesPerView: 2 },
                    1100: { slidesPerView: 3 }
                }
            });
        }
    };

    // 6. ТЕРМИНАЛ (ИННОВАЦИИ)
    const initTerminal = () => {
        const textEl = document.getElementById('ai-typing-text');
        if (!textEl) return;

        const phrases = [
            "Анализирую входящий запрос...",
            "Оптимизация нейронных связей...",
            "Локализация: Франция (EU)...",
            "Vox-Meter AI: Готов к работе."
        ];
        
        let pIdx = 0, cIdx = 0, isDeleting = false;

        function type() {
            const current = phrases[pIdx];
            if (isDeleting) {
                textEl.textContent = current.substring(0, cIdx - 1);
                cIdx--;
            } else {
                textEl.textContent = current.substring(0, cIdx + 1);
                cIdx++;
            }

            let speed = isDeleting ? 40 : 80;

            if (!isDeleting && cIdx === current.length) {
                isDeleting = true;
                speed = 2500; // Пауза в конце фразы
            } else if (isDeleting && cIdx === 0) {
                isDeleting = false;
                pIdx = (pIdx + 1) % phrases.length;
                speed = 500;
            }

            setTimeout(type, speed);
        }
        type();
    };

    // 7. ОБЩИЕ АНИМАЦИИ ПОЯВЛЕНИЯ (Bento, Blog)
    const initScrollReveals = () => {
        if (typeof gsap === 'undefined' || !ScrollTrigger) return;

        gsap.utils.toArray('.fade-up').forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });
        });
    };

    // 8. КОНТАКТНАЯ ФОРМА
    const initForm = () => {
        const form = document.getElementById('ai-contact-form');
        const success = document.getElementById('success-message');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;

            // Имитация отправки
            btn.disabled = true;
            btn.innerHTML = 'Обработка...';

            setTimeout(() => {
                form.style.display = 'none';
                if (success) success.style.display = 'flex';
            }, 1500);
        });
    };

    // 9. COOKIE POPUP
    const initCookies = () => {
        const popup = document.getElementById('cookie-popup');
        const btn = document.getElementById('accept-cookies');
        
        if (!popup || !btn) return;

        if (!localStorage.getItem('vox_cookies_accepted')) {
            setTimeout(() => {
                popup.classList.add('is-show');
            }, 3000);
        }

        btn.onclick = () => {
            localStorage.setItem('vox_cookies_accepted', 'true');
            popup.classList.remove('is-show');
        };
    };

    // ЗАПУСК ВСЕХ МОДУЛЕЙ
    initMobileMenu();
    initHeader();
    initHeroAnimation();
    initCasesSlider();
    initTerminal();
    initScrollReveals();
    initForm();
    initCookies();
});

// Глобальная функция для возврата к форме (используется в HTML кнопкой reset)
window.resetForm = function() {
    const form = document.getElementById('ai-contact-form');
    const success = document.getElementById('success-message');
    if (form && success) {
        success.style.display = 'none';
        form.style.display = 'flex';
        form.reset();
        form.querySelector('button').disabled = false;
        form.querySelector('button').innerHTML = 'Запросить доступ';
    }
};