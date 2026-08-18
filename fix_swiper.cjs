const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Update container classes
html = html.replace('<div class="portal-mask">', '<div class="portal-mask swiper mySwiper">');
html = html.replace('<div class="carousel-track">', '<div class="carousel-track swiper-wrapper">');

// Add swiper-slide to project cards
html = html.replaceAll('<div class="project-card">', '<div class="project-card swiper-slide">');

// Remove duplicated cards
const dupStart = html.indexOf('<!-- Duplicate for infinite scroll -->');
if (dupStart !== -1) {
  // Find the end of the carousel-track div
  // Since we know the duplicate is exactly at the end of the track
  const endTrack = html.indexOf('</div>\n          </div>\n          </div>', dupStart);
  if (endTrack !== -1) {
    html = html.substring(0, dupStart) + html.substring(endTrack);
  }
}

fs.writeFileSync('index.html', html);
console.log('Success');
