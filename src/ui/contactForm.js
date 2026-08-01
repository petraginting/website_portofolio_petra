export function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const { name, email, subject, message } = form.elements;
    if (
      !name.value.trim() ||
      !email.value.trim() ||
      !subject.value.trim() ||
      !message.value.trim()
    ) {
      alert("Mohon lengkapi semua field terlebih dahulu.");
      return;
    }

    // TODO: ganti alert ini dengan integrasi kirim email asli.
    // Pilihan simpel tanpa backend: Formspree (formspree.io) atau EmailJS (emailjs.com).
    alert("Terima kasih! Pesan kamu akan segera kami balas.");
    form.reset();
  });
}
