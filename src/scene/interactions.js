import { getSpaceship } from "./spaceship.js";
import { isMobile } from "../utils/device.js";

let mouseX = 0;
let mouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function trackPointer(clientX, clientY) {
  mouseX = clientX - windowHalfX;
  mouseY = clientY - windowHalfY;
}

export function initPointerTracking() {
  document.addEventListener("mousemove", (e) =>
    trackPointer(e.clientX, e.clientY),
  );

  document.addEventListener(
    "touchstart",
    (e) =>
      e.touches?.length &&
      trackPointer(e.touches[0].clientX, e.touches[0].clientY),
    { passive: true },
  );

  document.addEventListener(
    "touchmove",
    (e) =>
      e.touches?.length &&
      trackPointer(e.touches[0].clientX, e.touches[0].clientY),
    { passive: true },
  );
}

export function getTargetRotation() {
  const factor = isMobile ? 0.0015 : 0.0018;
  return {
    x: mouseY * factor * 0.6,
    y: mouseX * factor,
  };
}

export function updateCameraFromScroll(camera) {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = 60 + t * -0.09;
  camera.rotation.y = t * -0.0015;

  const spaceship = getSpaceship();
  if (spaceship) {
    spaceship.rotation.x += 0.001;
    spaceship.rotation.y += 0.02;
  }
}
