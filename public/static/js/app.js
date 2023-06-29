import lazyObserver from "./modules/lazyObserve.js";
import toggleMenu from "./modules/mobileButton.js";
import scrollRevealInit from "./modules/scrollReveal.js";
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.esm.browser.min.js';

scrollRevealInit();
toggleMenu();
lazyObserver();


/*Init Carousel*/

const swiper = new Swiper('.swiper', {
  autoplay: {
    delay: 5000,
  },
  loop: true,
  
  pagination: {
    el: '.swiper-pagination',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});