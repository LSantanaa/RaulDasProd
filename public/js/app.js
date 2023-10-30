function initializeScripts() {
 
  const linksMenu = document.querySelectorAll(
    ".nav__list .list__item__link:not(a.list__item__logo)"
  );

  function activeMenu(e) {
    linksMenu.forEach((link) => {
      link.classList.remove("link__active");
    });
    e.currentTarget.classList.add("link__active");
    localStorage.setItem("activeLink", e.currentTarget.href);
  }

  linksMenu.forEach((link) => {
    link.addEventListener("click", activeMenu);
  });

  window.onload = function () {
    const activeLinkURL = localStorage.getItem("activeLink");
    if (activeLinkURL !== null) {
      const activeLink = Array.from(linksMenu).find(
        (link) => link.href === activeLinkURL
      );
      if (
        activeLink !== undefined &&
        activeLink.href === window.location.href
      ) {
        activeLink.classList.add("link__active");
      }
      if (window.location.href === linksMenu[0].href) {
        linksMenu[0].classList.add("link__active");
      }
    }
  };

  /*Outside Click Function*/
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
    let timeout;

    eventos.forEach((e) => {
      btn.addEventListener(e, handleClick, { passive: false });
    });

    function handleClick(event) {
      if (event.type === "touchstart" && event.cancelable)
        event.preventDefault();
      nav.classList.toggle(ativo);
      const active = nav.classList.contains(ativo);
      event.currentTarget.setAttribute("aria-expanded", active);

      if (active) {
        event.currentTarget.setAttribute("aria-label", "Fechar Menu");
      }

      if (!active) {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
          nav.classList.remove(ativo);
        }, 700);
      }

      outsideClick(this, eventos, () => {
        setTimeout(() => {
          nav.classList.remove(ativo);
        }, 700);
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
      viewFactor: 0.5,
    });

    sr.reveal(".container__division, .container__sobre__division", {
      duration: 1100,
      delay: 260,
    });

    sr.reveal(".titleMango, .insta__info", {
      scale: 0.3,
      distance: 0,
      delay: 220,
    });
    sr.reveal(".container__insta__banner", {
      scale: 0.5,
      delay: 350,
      distance: 0,
    });

    sr.reveal(".container__sobre__questions", {
      delay: 800,
      origin: "left",
    });
    sr.reveal(".container__sobre__skills", {
      delay: 800,
      origin: "right",
    });

    sr.reveal(".container__sobre__formation", {
      delay: 500,
    });

    sr.reveal(".container__carousel", {
      delay: 300,
      viewFactor: 0.4,
    });

    sr.reveal(
      ".container__sobre__job__info, .container__sobre__job__photo, .icon, .enjoy p",
      {
        scale: 0.2,
        distance: 0,
        viewFactor: 0.7,
      }
    );

    sr.reveal(".container__title", {
      scale: 0.2,
      distance: 0,
    });
  }
  scrollRevealInit();

  /*Init Carousel*/
  const swiper = new Swiper(".swiper", {
    autoplay: {
      delay: 5000,
    },
    loop: true,
    cssMode: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    mousewheel: true,
    keyboard: true,
  });

  const swiper2 = new Swiper(".swiper2", {
    autoplay:{
      delay:4000
    },
    breakpoints: {
      // when window width is >= 320px
      370: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        spaceBetween: 24
      },
    },
    navigation: {
      nextEl: ".swiper__next",
      prevEl: ".swiper__prev",
    },
    slidesPerView: 3,
    spaceBetween: 24,
    loop: true,
  });



  //**GSAP */
  /**GSAP Animation Text (página sobre)*/
  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(TextPlugin, ScrollTrigger);

    let words = gsap.utils.toArray(".typewriter"),
      tl = gsap.timeline({
        delay: 0.5,
        repeat: -1,
        repeatDelay: 2,
        yoyo: true,
      }),
      timePerCharacter = 0.15;

    words.forEach((el) => {
      tl.from(el, {
        text: "",
        duration: el.innerHTML.length * timePerCharacter,
        ease: "none",
        onUpdate: () => {
          el.dataset.content = "|";
        },
        onComplete: () => {
          el.dataset.content = "";
        },
        onReverseComplete: () => {
          el.dataset.content = "";
        },
      });
    });

    if (document.querySelectorAll(".container__video__card").length > 0) {
      let proxy = { skew: 0 },
        skewSetter = gsap.quickSetter(
          ".container__video__card",
          "skewY",
          "deg"
        ),
        clamp = gsap.utils.clamp(-5, 5); // don't let the skew go beyond 20 degrees.

      ScrollTrigger.create({
        onUpdate: (self) => {
          let skew = clamp(self.getVelocity() / -800);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew),
            });
          }
        },
      });

      function gsapInit() {
        gsap.set(".container__video__card", {
          transformOrigin: "right center",
          force3D: true,
        });

        gsap.from(".container__video__card.curta:first-child", {
          y: -150,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".curta:first-child",
          },
        });

        gsap.from(".container__video__card.curta:not(:first-child)", {
          x: -350,
          delay: 1,
          opacity: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: ".curta",
          },
        });

        gsap.from(".container__video__card.comercial", {
          x: -250,
          delay: 0.5,
          opacity: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: ".comercial",
          },
        });

        gsap.from(".container__video__card.videoclipe", {
          x: 250,
          delay: 0.5,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".videoclipe",
          },
        });
      }
      gsapInit();
    }
  }
}

initializeScripts();
