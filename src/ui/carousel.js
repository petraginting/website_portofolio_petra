import Swiper from 'swiper';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export function initCarousel() {
  const swiperElement = document.querySelector('.mySwiper');
  if (!swiperElement) return;

  createParticles();

  new Swiper('.mySwiper', {
    modules: [EffectCoverflow, Autoplay, Pagination],
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    loopedSlides: 12,
    watchSlidesProgress: true,
    coverflowEffect: {
      rotate: 35,
      stretch: -80,
      depth: 150,
      modifier: 1,
      slideShadows: true,
      scale: 0.9,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });
}

function createParticles() {
  const wrapper = document.querySelector('.portal-wrapper');
  if (!wrapper || document.querySelector('.portal-particles')) return;
  
  const leftParticles = document.createElement('div');
  leftParticles.className = 'portal-particles left-particles';
  
  const rightParticles = document.createElement('div');
  rightParticles.className = 'portal-particles right-particles';
  
  // 20 particles per side for slightly more density but still lightweight
  for(let i=0; i<20; i++) {
    const p1 = document.createElement('span');
    p1.style.setProperty('--delay', `${Math.random() * 2.5}s`);
    p1.style.setProperty('--startX', `${80 + Math.random() * 150}px`);
    p1.style.setProperty('--startY', `${(Math.random() - 0.5) * 350}px`);
    leftParticles.appendChild(p1);
    
    const p2 = document.createElement('span');
    p2.style.setProperty('--delay', `${Math.random() * 2.5}s`);
    p2.style.setProperty('--startX', `${80 + Math.random() * 150}px`);
    p2.style.setProperty('--startY', `${(Math.random() - 0.5) * 350}px`);
    rightParticles.appendChild(p2);
  }
  
  wrapper.appendChild(leftParticles);
  wrapper.appendChild(rightParticles);
}
