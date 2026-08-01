const texts = ["Hello, I'm Petra Ginting", "Frontend & Software Quality"];

export function initTypewriter() {
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const el = document.getElementById("typing-text");
  if (!el) return;

  function type() {
    const currentText = texts[textIndex];

    if (!isDeleting && charIndex < currentText.length) {
      el.textContent += currentText.charAt(charIndex++);
    } else if (isDeleting && charIndex > 0) {
      el.textContent = currentText.substring(0, --charIndex);
    } else if (!isDeleting) {
      isDeleting = true;
      setTimeout(type, 2000);
      return;
    } else {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }

    setTimeout(type, isDeleting ? 40 : 100);
  }

  window.addEventListener("load", type);
}
