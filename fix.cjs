const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/Live Demo[^\<]+/g, 'Live Demo &rarr;');
html = html.replace(/GitHub[^\<]+/g, 'GitHub &rarr;');
if (!html.includes('lucide@latest')) {
  html = html.replace('</body>', '<script src="https://unpkg.com/lucide@latest"></script>\n<script>lucide.createIcons();</script>\n</body>');
}
fs.writeFileSync('index.html', html, 'utf8');
