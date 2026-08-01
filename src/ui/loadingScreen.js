export function initLoadingScreen() {
  window.addEventListener("load", () => {
    document.body.style.visibility = "visible";

    const loader = document.getElementById("loader");
    if (!loader) return;

    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 500); // disamain sama durasi transition di CSS
    }, 580);
  });
}
