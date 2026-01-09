document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });

    // Mobile Menu Toggle (Basic for now)
    const burger = document.getElementById('burger');
    burger.addEventListener('click', () => {
        alert('Меню в разработке — добавим плавную анимацию на этапе Hero!');
    });

    // Smooth scroll for anchors
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
    initHeroAnimation();
});

function initHeroAnimation() {
    // Регистрируем плагин (если используем ScrollTrigger, но здесь пока только базовая анимация при загрузке)
    gsap.registerPlugin(ScrollTrigger);

    // Разбиваем текст заголовка на слова и буквы
    const titleText = new SplitType('.hero__title.text-reveal', { types: 'words, chars' });

    // Создаем таймлайн
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

    // Анимация бейджа
    tl.from('.hero__badge', {
        y: 20,
        opacity: 0,
        duration: 0.8
    }, 0.3);

    // Анимация заголовка по буквам
    tl.from(titleText.chars, {
        y: 100,
        opacity: 0,
        stagger: 0.02,
        rotateX: -90,
        transformOrigin: "0% 50% -50"
    }, 0.5);

    // Анимация остальных элементов (подзаголовок, кнопки, статистика, визуал)
    tl.from('.fade-in', {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        clearProps: "all" // Очищаем свойства после анимации, чтобы не мешать ховерам
    }, 1.2);
};