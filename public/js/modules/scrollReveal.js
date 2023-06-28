export default function scrollRevealInit(){

  const sr = ScrollReveal({
    easing: 'ease',
    duration: 1000,
    origin: 'bottom',
    distance: '100%'
  });

  sr.reveal('.container__header', {
      delay: 100
    });

  sr.reveal('.container__logo', {
    delay: 200
  });

  sr.reveal('.container__description', {
    distance: '70%',
    origin: 'left',
    delay: 200
  });

  sr.reveal('.container__card', {
    distance: '70%',
    origin: 'left',
    delay: 220
  });

  sr.reveal('.container__division, .sobre__container__division', {
    duration: 1200,
    delay: 260
  });

  sr.reveal('.sobre__container__formation', {
    duration: 1300,
    delay: 300
  });

  sr.reveal('.container__carousel',{
    duration: 1300,
    delay: 300
  })
}
