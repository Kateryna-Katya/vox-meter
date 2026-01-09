document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок
    lucide.createIcons();

    // 2. Хедер: Эффект при скролле
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('header--scrolled', window.scrollY > 50);
    });

    // 3. Мобильное меню
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu-overlay');
    const navLinks = document.querySelectorAll('.mobile-nav__link');

    const toggleMenu = () => {
        burger.classList.toggle('is-active');
        mobileMenu.classList.toggle('is-active');
        document.body.style.overflow = mobileMenu.classList.contains('is-active') ? 'hidden' : '';
    };

    burger.addEventListener('click', toggleMenu);
    navLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // 4. Плавный скролл для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. GSAP Анимации: Hero и Скролл-эффекты
    initAnimations();

    // 6. AI Терминал (секция Innovations)
    initAiTerminal();

    // 7. Слайдер кейсов (Swiper)
    initCasesSlider();

    // 8. Контактная форма и Капча
    initContactForm();

    // 9. Cookie Popup
    initCookiePopup();
});

/** --- АНИМАЦИИ --- **/
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Reveal
    const titleText = new SplitType('.hero__title.text-reveal', { types: 'words, chars' });
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

    tl.from('.hero__badge', { y: 20, opacity: 0 }, 0.3)
      .from(titleText.chars, { 
          y: 80, opacity: 0, stagger: 0.02, rotateX: -90, transformOrigin: "0% 50% -50" 
      }, 0.5)
      .from('.fade-in', { y: 40, opacity: 0, stagger: 0.2 }, 1.2);

    // Общий Scroll Reveal для всех секций
    gsap.utils.toArray('.fade-up').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 90%" },
            y: 50, opacity: 0, duration: 1, ease: "power3.out"
        });
    });

    gsap.utils.toArray('.fade-right').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 90%" },
            x: 50, opacity: 0, duration: 1, ease: "power3.out"
        });
    });
}

/** --- AI ТЕРМИНАЛ --- **/
function initAiTerminal() {
    const textElement = document.getElementById('ai-typing-text');
    if (!textElement) return;

    const phrases = [
        "Анализирую входящий запрос...",
        "Генерация ответа на французском...",
        "Адаптация под бизнес-логику...",
        "Система готова к работе.",
        "Нейронные связи оптимизированы."
    ];
    
    let phraseIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        textElement.textContent = isDeleting 
            ? currentPhrase.substring(0, charIndex - 1) 
            : currentPhrase.substring(0, charIndex + 1);
        
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }
    type();
}

/** --- СЛАЙДЕР --- **/
function initCasesSlider() {
    // Проверка наличия Swiper перед инициализацией
    const checkSwiper = setInterval(() => {
        if (window.Swiper) {
            clearInterval(checkSwiper);
            new Swiper('.cases-slider', {
                slidesPerView: 1,
                spaceBetween: 30,
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                breakpoints: { 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }
            });
        }
    }, 100);
}

/** --- КОНТАКТНАЯ ФОРМА --- **/
let captchaResult = 0;
function initContactForm() {
    const form = document.getElementById('ai-contact-form');
    if (!form) return;

    const generateCaptcha = () => {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        captchaResult = a + b;
        document.getElementById('captcha-label').textContent = `Решите пример: ${a} + ${b} = ?`;
    };

    generateCaptcha();

    document.getElementById('user_phone').addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^\d+()-\s]/g, '');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const userCaptcha = parseInt(document.getElementById('captcha_input').value);
        
        if (userCaptcha !== captchaResult) {
            alert('Ошибка капчи!');
            generateCaptcha();
            return;
        }

        const btn = form.querySelector('button');
        btn.disabled = true;
        btn.innerText = 'Отправка...';

        setTimeout(() => {
            form.style.display = 'none';
            document.getElementById('success-message').style.display = 'flex';
        }, 1500);
    });
}

/** --- COOKIE POPUP --- **/
function initCookiePopup() {
    const popup = document.getElementById('cookie-popup');
    const acceptBtn = document.getElementById('accept-cookies');

    if (!localStorage.getItem('cookies-accepted')) {
        setTimeout(() => popup.classList.add('is-show'), 2000);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookies-accepted', 'true');
        popup.classList.remove('is-show');
    });
}