gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();

tl.from('#start-img', {
    stagger: .2,
    y: 20,
    opacity: 0
}).from('#start-text-1', {
    duration: 1,
    x: -200,
    opacity: 0
}).from('#start-text-2', {
    duration: 1,
    x: 200,
    opacity: 0
}).from('#start-text-3', {
    duration: 1,
    y: 200,
    opacity: 0
})

tl.to('#start-img', {
    x: -200,
    opacity: 0
}, 'myLabel').to('#start-text-1', {
    x: -200,
    opacity: 0
}, 'myLabel').to('#start-text-2', {
    x: -200,
    opacity: 0
}, 'myLabel').to('#start-text-3', {
    x: -200,
    opacity: 0
}, 'myLabel').to('.loader', {
    duration: 1,
    xPercent: -100,
    opacity: 0
}, 'myLabel')

tl.from('#nlink', {
    stagger: .2,
    opacity: 0,
    x: -20
})

function text_start() {
    Shery.textAnimate("#text_start", {
        //Parameters are optional.
        style: 1,
        duration: .6,
        y: 20,
        multiplier: 0.1
    })
}

tl.from('#anim2 img', {
    y: 100,
    opacity: 0,
    duration: 1
}, 'myLabel').to('#text_start', {
    onStart: text_start,
    opacity: 1
}, 'myLabel')

document.querySelector('.burger').addEventListener('click', function (e) {
    e.preventDefault();
    
    const navBlock = document.querySelector('.nav-mobile__block');
    const currentTransform = window.getComputedStyle(navBlock).transform;

    const nav_mobile_a = document.querySelectorAll('.nav-mobile__block-paragraph');

    if (currentTransform === 'matrix(1, 0, 0, 1, 0, 0)') {
        navBlock.style.transform = 'translateY(-200%)';
        document.body.style.overflow = 'auto';
    } else {
        navBlock.style.transform = 'translateY(0%)';
        document.body.style.overflow = 'hidden';
    }

    nav_mobile_a.forEach(e => {
        e.addEventListener('click', () => {
            navBlock.style.transform = 'translateY(-200%)';
            document.body.style.overflow = 'auto';
        })
    });
});

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};

let sizes = window.innerWidth;

if (sizes >= 1240) {
  const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
  lerp: 0.05, // Linear Interpolation, 0 > 1 // Try 0.01
  multiplier: 1.4, // Effect Multiplier
  reloadOnContextChange: true,
  easing: Power1.out
});

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

let container = document.getElementById("main");
gsap.to(container, {
  x: () => -(container.scrollWidth - document.documentElement.clientWidth) + "px",
  ease: "none",
  scrollTrigger: {
    trigger: container,
    invalidateOnRefresh: true,
    pin: true,
    scrub: 1,
    end: () => "+=" + container.offsetWidth,
  },
});


ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();

gsap.from(".footer-content", {
    yPercent: -100,  // Контент спускается в нормальное положение
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".footer",  // Триггер анимации — сам подвал
        start: "top bottom",  // Начало анимации, когда верхняя часть подвала входит в видимую область
        end: "top top",  // Окончание анимации
        scrub: 1,  // Плавная анимация при скролле
        scroller: "#main",  // Подключение к Locomotive Scroll
      }
    }
  );

gsap.to('.text-two-one',
{
    scrollTrigger: {
        trigger: '.text-two-one',
        start: 'top 35%',
        scrub: true,
        end: 'top 35%',
        scroller: '#main',
    },
    color: '#022d42'
})

gsap.to('.text-two-two',
{
    scrollTrigger: {
        trigger: '.text-two-two',
        start: 'top 35%',
        scrub: true,
        end: 'top 35%',
        scroller: '#main',
    },
    color: '#022d42'
})

gsap.to('.text-two-three',
{
    scrollTrigger: {
        trigger: '.text-two-three',
        start: 'top 35%',
        scrub: true,
        end: 'top 35%',
        scroller: '#main',
    },
    color: '#022d42'
})

gsap.to('.text-two-four',
{
    scrollTrigger: {
        trigger: '.text-two-four',
        start: 'top 35%',
        scrub: true,
        end: 'top 35%',
        scroller: '#main',
    },
    color: '#022d42'
})

gsap.to('.text-two-five',
{
    scrollTrigger: {
        trigger: '.text-two-five',
        start: 'top 35%',
        scrub: true,
        end: 'top 35%',
        scroller: '#main',
    },
    color: '#022d42'
})
}

// end if

gsap.to('.intresting-images-one', 
{
    scrollTrigger: {
        trigger: '.intresting-images',
        start: 'top 70%',
        end: 'top top',
        scrub: true,
    },
    yPercent: '-50'
})

gsap.to('.intresting-images-two', 
{
    scrollTrigger: {
        trigger: '.intresting-images',
        start: 'top 70%',
        end: 'top top',
        scrub: true,
    },
    yPercent: '40'
})

gsap.to('.intresting-images-three', 
{
    scrollTrigger: {
        trigger: '.intresting-images',
        start: 'top 70%',
        end: 'top top',
        scrub: true
    },
    yPercent: '50'
})

gsap.to('.text-two-one',
{
    scrollTrigger: {
        trigger: '.text-two-one',
        start: 'top 75%',
        scrub: true,
        end: 'top 75%',
    },
    color: '#022d42'
})

gsap.to('.text-two-two',
{
    scrollTrigger: {
        trigger: '.text-two-two',
        start: 'top 75%',
        scrub: true,
        end: 'top 75%',
    },
    color: '#022d42'
})

gsap.to('.text-two-three',
{
    scrollTrigger: {
        trigger: '.text-two-three',
        start: 'top 75%',
        scrub: true,
        end: 'top 75%',
    },
    color: '#022d42'
})

gsap.to('.text-two-four',
{
    scrollTrigger: {
        trigger: '.text-two-four',
        start: 'top 75%',
        scrub: true,
        end: 'top 75%',
    },
    color: '#022d42'
})

gsap.to('.text-two-five',
{
    scrollTrigger: {
        trigger: '.text-two-five',
        start: 'top 75%',
        scrub: true,
        end: 'top 75%',
    },
    color: '#022d42'
})

if (sizes > 1024) {

    Shery.mouseFollower({
        //Parameters are optional.
        duration: .2,
    });
    
    document.getElementById('main').style.cursor = 'none';
}

gsap.to('.fact-text', {
    scrollTrigger: {
        trigger: '.fact',
        scroller: '#main',
        start: '-50% top',  
        end: '150% bottom',
        scrub: true,
        ease: 'Power1.in'
    },
    yPercent: '79'
})

if (sizes > 820) {

gsap.to('.fact-text', {
    scrollTrigger: {
        trigger: '.fact',
        start: '-50% top',  
        end: '150% bottom',
        scrub: true,
        ease: 'Power1.in'
    },
    yPercent: '79'
})

}