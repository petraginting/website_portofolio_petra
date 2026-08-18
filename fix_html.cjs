const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('<div class=\"carousel-track\">', '<div class=\"portal-mask\">\n            <div class=\"carousel-track\">');
html = html.replace('<!-- Duplicate for infinite scroll -->', '<!-- Duplicate for infinite scroll -->'); // dummy
html = html.replace('</div>\n          </div>', '</div>\n          </div>\n          </div>');
fs.writeFileSync('index.html', html);
console.log('Success');
