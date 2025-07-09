document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

window.addEventListener('scroll', function () {
  const parallax = document.querySelector('.parallax-bg');
  if (parallax) {
    const scrolled = window.scrollY;
    parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const covers = [
    ...document.querySelectorAll('.about .col-md-6:first-child img, .hero-graphic img, .card img, img.img-fluid')
  ];
  const svg = document.getElementById('svg-long-line');
  if (!svg) return;
  const bolas = svg.querySelectorAll('.servicos-bola');
  function updateBolaOpacity() {
    if (!bolas.length) return;
    bolas.forEach(bola => {
      const bolaRect = bola.getBoundingClientRect();
      let overlap = false;
      covers.forEach(img => {
        const imgRect = img.getBoundingClientRect();
        if (
          bolaRect.right > imgRect.left &&
          bolaRect.left < imgRect.right &&
          bolaRect.bottom > imgRect.top &&
          bolaRect.top < imgRect.bottom
        ) {
          overlap = true;
        }
      });
      bola.style.opacity = overlap ? '0.08' : '1';
    });
  }
  window.addEventListener('scroll', updateBolaOpacity);
  window.addEventListener('resize', updateBolaOpacity);
  setInterval(updateBolaOpacity, 200);
});
