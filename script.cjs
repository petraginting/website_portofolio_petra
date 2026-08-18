const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const startMarker = '<div class="projects-grid">';
const startIdx = html.indexOf(startMarker);
if (startIdx === -1) {
  console.log('Could not find projects-grid');
  process.exit(1);
}

let openDivs = 0;
let endIdx = -1;
for (let i = startIdx; i < html.length; i++) {
  if (html.substr(i, 4) === '<div') openDivs++;
  if (html.substr(i, 5) === '</div') {
    openDivs--;
    if (openDivs === 0) {
      endIdx = i + 6;
      break;
    }
  }
}

const originalGridContent = html.substring(startIdx + startMarker.length, endIdx - 6);

const newStructure = `          <div class="portal-wrapper">
            <div class="carousel-track">
              ${originalGridContent}
              <!-- Duplicate for infinite scroll -->
              ${originalGridContent}
            </div>
          </div>`;

const newHtml = html.substring(0, startIdx) + newStructure + html.substring(endIdx);
fs.writeFileSync('index.html', newHtml);
console.log('Success');
