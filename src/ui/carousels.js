import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export function initCarousels() {
  // Initialize About Me Photo Swiper (Fade Effect)
  new Swiper('.about-swiper', {
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    allowTouchMove: true,
  });

  // Initialize Skills Continuous Marquee Swiper
  new Swiper('.skills-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 30, // Jarak antar kartu (sekitar 2rem)
    loop: true,
    freeMode: true, // Memungkinkan geseran bebas tanpa snap per-slide
    speed: 3000, // Kecepatan gerak kontinu
    autoplay: {
      delay: 0, // Tanpa jeda
      disableOnInteraction: false,
      pauseOnMouseEnter: true, // Berhenti saat disentuh/hover
    },
    grabCursor: true,
  });

  // Initialize Projects 3D Coverflow Swiper
  new Swiper('.projects-swiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: 1, // Start on the second slide
    coverflowEffect: {
      rotate: 50, // Putaran lebih tajam
      stretch: -50, // Slide saling menumpuk rapat
      depth: 500, // Kedalaman 3D sangat ekstrem
      modifier: 1.5, // Efek dikali lipat
      slideShadows: true, // Bayangan aktif agar ada dimensi kedalaman
    },
    loop: true,
    autoplay: {
      delay: 2500, // Bergerak setiap 2.5 detik
      disableOnInteraction: false, // Tetap berjalan meski sudah disentuh/digeser
    },
    speed: 1200, // Transisi gesernya dibuat sangat lambat (1.2 detik) agar mewah
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      // Mobile
      320: {
        slidesPerView: 1.2,
      },
      // Tablet/Desktop
      768: {
        slidesPerView: 2.5,
      }
    }
  });
}
