export default function lazyObserver(){

function loadVideo(iframe) {
    const src = iframe.getAttribute('data-src');
    iframe.setAttribute('src', src);
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

const lazyVideos = document.querySelectorAll('.lazy');


lazyVideos.forEach((lazyVideo) => {
  observer.observe(lazyVideo);
});

}