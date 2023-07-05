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

    sr.reveal(".container__division, .sobre__container__division", {
      duration: 1200,
      delay: 260,
    });

    sr.reveal(".sobre__container__formation", {
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

    function typeWriter(elemento) {
      const textoArray = elemento.textContent.split('');
      elemento.textContent = '';
      elemento.dataset.content ="|"
      elemento.style.opacity = '1';
      setTimeout(()=>{
        textoArray.forEach((letra, i, array) => {
          setTimeout(() =>{
           elemento.textContent += letra
          }, 80 * i);
          setTimeout(()=>{
            elemento.dataset.content =""
          }, array.length * 100)
        });
    
      },400)
    }

    const skillsElements = document.querySelectorAll('.typewriter')
    if(skillsElements.length !== 0){
      setTimeout(()=> typeWriter(skillsElements[0]), 1100);
      setTimeout(()=> typeWriter(skillsElements[1]), 2200);
      setTimeout(()=> typeWriter(skillsElements[2]), 3300);
      skillsElements.forEach((element, i) =>{
        setInterval(()=>  setTimeout(()=> typeWriter(element), 1100 *i),5500)
      })
    }

    


    
  })();
