import outsideClick from "./outsideClick.js";

export default function toggleMenu() {
  const btn = document.querySelector('.btn__mobile') 
  const nav = document.querySelector('.header__nav')
  const ativo = 'ativo';
  const eventos = ['click', 'touchstart']

  eventos.forEach(e =>{ btn.addEventListener(e, handleClick, {passive:false}) })

  function handleClick(event){
    if(event.type === 'touchstart' && event.cancelable) event.preventDefault();
    nav.classList.toggle(ativo)
    const active = nav.classList.contains(ativo)
    event.currentTarget.setAttribute('aria-expanded', active)
    
    if(active){
      event.currentTarget.setAttribute('aria-label', "Fechar Menu")
    }

    outsideClick(this, eventos, ()=>{
      nav.classList.remove(ativo)
    })
  }
}