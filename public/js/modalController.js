function openModal(){
  let cardsVideo = document.querySelectorAll('.container__video__card');
  let btnClose = document.getElementById('btnClose');
  let modal = document.querySelector('.container__projetos__modal');

  cardsVideo.forEach((card)=>{
    card.addEventListener('click', ()=>{
      modal.querySelector('iframe').src = `${card.dataset.iframeSrc}?autoplay=1&rel=0&amp;showinfo=0`;
      modal.style.display = 'flex';

      document.body.style.overflow = "hidden";

      outsideClick(card, ['click'], ()=>{
        modal.style.display = 'none';
        modal.querySelector('iframe').src = ''
        document.body.style.overflow = "auto"; // Permitir rolagem da página
      })
    })
  })
  btnClose.addEventListener("click", function() {
    modal.style.display = "none";
    modal.querySelector('iframe').src = '';
    document.body.style.overflow = "auto"; // Permitir rolagem da página
  });
}

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


openModal()