/*Outside Click Function*/
(function() {
  function outsideClick(element, events, callback) {
    const html = document.documentElement;
    const outside = "data-outside";

    if (!element.hasAttribute(outside)) {
      events.forEach((userEvent) => {
        html.addEventListener(userEvent, handleOutside);
      });

      element.setAttribute(outside, "");
    }
    function handleOutside(event) {
      if (!element.contains(event.target)) {
        element.removeAttribute(outside);
        events.forEach((userEvent) => {
          html.removeEventListener(userEvent, handleOutside);
        });
        callback();
      }
    }
  }
  /**BTN MOBILE FUNCTION */

  function toggleMenu() {
    const btn = document.querySelector(".btn__mobile");
    const nav = document.querySelector(".header__nav");
    const ativo = "ativo";
    const eventos = ["click", "touchstart"];

    eventos.forEach((e) => {
      btn.addEventListener(e, handleClick, { passive: false });
    });

    function handleClick(event) {
      if (event.type === "touchstart" && event.cancelable) event.preventDefault();
      nav.classList.toggle(ativo);
      const active = nav.classList.contains(ativo);
      event.currentTarget.setAttribute("aria-expanded", active);

      if (active) {
        event.currentTarget.setAttribute("aria-label", "Fechar Menu");
      }

      outsideClick(this, eventos, () => {
        nav.classList.remove(ativo);
      });
    }
  }
  toggleMenu();

  /**Hidden Iframe Youtube */
  function lazyObserver() {
    function loadVideo(iframe) {
      const src = iframe.getAttribute("data-src");
      iframe.setAttribute("src", src);
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const iframe = entry.target;
          loadVideo(iframe);
          observer.unobserve(iframe);
        }
      });
    });

    const lazyVideos = document.querySelectorAll(".lazy");

    lazyVideos.forEach((lazyVideo) => {
      observer.observe(lazyVideo);
    });
  }
  lazyObserver();

  /*Scroll Reveal Animation*/
  function scrollRevealInit() {
    const sr = ScrollReveal({
      easing: "ease",
      duration: 1000,
      origin: "bottom",
      distance: "100%",
    });

    sr.reveal(".container__header", {
      delay: 100,
    });

    sr.reveal(".container__logo", {
      delay: 200,
    });

    sr.reveal(".container__description", {
      distance: "70%",
      origin: "left",
      delay: 200,
    });

    sr.reveal(".container__card", {
      distance: "70%",
      origin: "left",
      delay: 220,
    });

    sr.reveal(".container__division, .container__sobre__division", {
      duration: 1200,
      delay: 260,
    });

    sr.reveal(".container__sobre__formation", {
      duration: 1300,
      delay: 300,
    });

    sr.reveal(".container__carousel", {
      duration: 1300,
      delay: 300,
    });
  }
  scrollRevealInit();

  /*Init Carousel*/

  const swiper = new Swiper(".swiper", {
    autoplay: {
      delay: 5000,
    },
    loop: true,

    pagination: {
      el: ".swiper-pagination",
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    })



    let words = gsap.utils.toArray(".typewriter"),
    tl = gsap.timeline({ delay: 0.5, repeat: -1, repeatDelay: 2, yoyo: true }),
    timePerCharacter = 0.15;
  
    words.forEach(el => {
      tl.from(el, { 
        text: "",
        duration: el.innerHTML.length * timePerCharacter, 
        ease: "none", 
        onUpdate:()=>{ el.dataset.content = "|"},
        onComplete: () => {el.dataset.content = ""},
        onReverseComplete:  () =>{el.dataset.content = ""}
    });
  });
  
    
  })();
