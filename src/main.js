import "./styles/main.css";
import "./styles/loading-screen.css";
import "./styles/responsive.css";
import "./styles/critical.css";

import { scene, camera, renderer, clock, initResize } from "./scene/setup.js";
import { addLights } from "./scene/lights.js";
import { createStars, updateStars } from "./scene/stars.js";
import { loadSpaceship, updateSpaceship } from "./scene/spaceship.js";
import {
  initPointerTracking,
  getTargetRotation,
  updateCameraFromScroll,
} from "./scene/interactions.js";
import { isMobile } from "./utils/device.js";

import { initLoadingScreen } from "./ui/loadingScreen.js";
import { initTypewriter } from "./ui/typewriter.js";
import { initHamburgerMenu, initScrollToTop } from "./ui/navigation.js";
import { initContactForm } from "./ui/contactForm.js";
import { initCarousel } from "./ui/carousel.js";

// UI
initLoadingScreen();
initTypewriter();
initHamburgerMenu();
initScrollToTop();
initContactForm();
initCarousel();

// 3D scene
addLights(scene);
createStars(scene, isMobile);
loadSpaceship(scene);
initPointerTracking();
initResize();

document.body.onscroll = () => updateCameraFromScroll(camera);
updateCameraFromScroll(camera);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  const { x, y } = getTargetRotation();

  updateSpaceship(delta, x, y);
  updateStars();
  renderer.render(scene, camera);
}
animate();
