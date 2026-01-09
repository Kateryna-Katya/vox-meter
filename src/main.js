window.addEventListener('load', () => {
    // 1. Инициализация иконок
    if (window.lucide) lucide.createIcons();

    // 2. Хедер
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('header--scrolled', window.scrollY > 50);
    });

    // 3. Анимация Hero (Исправленная)
    const initHero = () => {
        const target = document.querySelector('.text-reveal');
        if (!target) return;

        // Сначала разбиваем текст
        const childSplit = new SplitType(target, { types: 'lines, words, chars' });
        
        // Создаем таймлайн
        const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

        tl.from('.hero__badge', { y: 20, opacity: 0 }, 0.2)
          .from(childSplit.chars, { 
              y: 100, 
              opacity: 0, 
              stagger: 0.02,
              duration: 1
          }, 0.4) // Появление символов
          .from('.fade-in', { y: 30, opacity: 0, stagger: 0.2 }, "-=0.5");
    };

    initHero();

    // 4. Swiper (Исправленный)
    if (document.querySelector('.cases-slider')) {
        new Swiper('.cases-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            breakpoints: {
                768: { slidesPerView: 2 },
                1100: { slidesPerView: 3 }
            }
        });
    }

    // 5. Scroll Animations
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.fade-up').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 90%" },
            y: 50, opacity: 0, duration: 1
        });
    });

    // Остальные функции (Terminal, Contact, Cookie)
    initAiTerminal();
    initContactForm();
    initCookiePopup();
    initMobileMenu();
});

// Вынесем мобильное меню отдельно для надежности
function initMobileMenu() {
    const burger = document.getElementById('burger');
    const menu = document.getElementById('mobile-menu-overlay');
    if (!burger || !menu) return;

    burger.onclick = () => {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
        document.body.style.overflow = menu.classList.contains('is-active') ? 'hidden' : '';
    };
}

// Оставьте функции initAiTerminal, initContactForm и initCookiePopup из предыдущего шага