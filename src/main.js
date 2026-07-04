// ===================================
// IMPORTS
// ===================================
import "./Style/Style_Utama.css";
import "./Style/LoadingScreen.css";
import "./Style/Responsive.css";
import "./Style/critical.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// ===================================
// LOADING SCREEN HANDLER
// ===================================
window.addEventListener("load", () => {
  document.body.style.visibility = "visible";

  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 30);
    }, 580);
  }
});

// ===================================
// SCENE SETUP
// ===================================
const canvas = document.querySelector("#bg");
const scene = new THREE.Scene();
// --- TAMBAHAN VARIABEL pesawat ---
let spaceship; // Wadah untuk objek pesawat
let mixer; // Wadah untuk animasi bawaan
const clock = new THREE.Clock(); // Untuk ngitung waktu animasi
// -------------------------------

const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000,
);
camera.position.z = 60; // posisi awal camera (jauh)

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// ===================================
// MOUSE / TOUCH INTERACTION VARIABLES
// ===================================
let mouseX = 0;
let mouseY = 0;
let targetRotX = 0;
let targetRotY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

// ===================================
// MOBILE DETECTION
// ===================================
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );

// ===================================
// CREATE MAIN OBJECT
// ===================================
const loader = new GLTFLoader();
loader.load(
  "/spaceship.glb",
  (gltf) => {
    spaceship = gltf.scene;

    spaceship.traverse((node) => {
      if (node.isMesh) {
        // Aktifkan mode kawat
        node.material.wireframe = true;

        // Opsional: Bikin materialnya emissive (bercahaya sendiri)
        node.material.emissive = new THREE.Color(0xdc2628);
        node.material.emissiveIntensity = 10000;
      }
    });

    //atur ukuran
    spaceship.scale.set(6, 6, 6);
    //posisi
    spaceship.position.set(0, 8, 0);
    scene.add(spaceship);

    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(spaceship);
      const action = mixer.clipAction(gltf.animations[0]);
      action.play();
    }
  },
  undefined,
  (error) => {
    console.error("Error loading spaceship: ", error);
  },
);

// ===================================
// LIGHTING
// ===================================
// Point Light: Cahaya titik fokus (Naikkan intensitasnya drastis)
const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(30, 30, 30);
scene.add(pointLight);
// Ambient Light: Cahaya dasar biar bagian gelap tetep kelihatan
const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);
//  Directional Light: Biar ada pantulan metalik yang keren dari atas
const sunLight = new THREE.DirectionalLight(0xffffff, 5);
sunLight.position.set(-10, 20, 10);
scene.add(sunLight);

// ===================================
// CREATE STARS (OPTIMIZED FOR MOBILE)
// ===================================
const stars = [];
const starCount = isMobile ? 150 : 300; // Kurangi jumlah stars di mobile untuk performa

function addStar() {
  const star = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 6, 6),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
  );

  star.position.set(
    (Math.random() - 0.5) * 800,
    (Math.random() - 0.5) * 800,
    -Math.random() * 500,
  );

  stars.push(star);
  scene.add(star);
}
Array(starCount).fill().forEach(addStar);

// ===================================
// EVENT HANDLERS - MOUSE & TOUCH
// ===================================
function onMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onTouchStart(event) {
  if (event.touches && event.touches.length > 0) {
    mouseX = event.touches[0].clientX - windowHalfX;
    mouseY = event.touches[0].clientY - windowHalfY;
  }
}

function onTouchMove(event) {
  if (event.touches && event.touches.length > 0) {
    mouseX = event.touches[0].clientX - windowHalfX;
    mouseY = event.touches[0].clientY - windowHalfY;
  }
}

document.addEventListener("mousemove", onMouseMove, false);
document.addEventListener("touchstart", onTouchStart, { passive: true });
document.addEventListener("touchmove", onTouchMove, { passive: true });

// ===================================
// SCROLL HANDLING
// ===================================
function moveCamera() {
  const t = document.body.getBoundingClientRect().top; // negatif saat scroll turun
  // sesuaikan faktor buat feeling zoom
  camera.position.z = 60 + t * -0.09; // zoom in saat scroll
  camera.rotation.y = t * -0.0015; // sedikit rotasi kamera
  // optional: parallax effect untuk object
  if (spaceship) {
    spaceship.rotation.x += 0.001;
    spaceship.rotation.y += 0.02;
  }
}
document.body.onscroll = moveCamera;
moveCamera(); // inisialisasi

// ===================================
// WINDOW RESIZE HANDLER (RESPONSIVE)
// ===================================
window.addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// ===================================
// ANIMATION LOOP
// ===================================
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta(); //ambil waktu
  if (mixer) mixer.update(delta); //update animasi bawaan

  // MAP mouse pos ke rotasi target (sesuaikan faktor untuk kepekaan)
  const factor = isMobile ? 0.0015 : 0.0018; // Kurangi sensitivitas di mobile
  targetRotY = mouseX * factor; // gerak horizontal
  targetRotX = mouseY * factor * 0.6; // gerak vertical (lebih lembut)

  // Smooth interpolation (lerp-like)
  if (spaceship) {
    spaceship.rotation.x += (targetRotX - spaceship.rotation.x) * 0.08;
    spaceship.rotation.y += (targetRotY - spaceship.rotation.y) * 0.08;
    // sedikit idle rotation untuk terasa hidup
    spaceship.rotation.y += 0.0005;
  }

  // ===== STAR WARP SPEED EFFECT (pelan & ringan) =====
  stars.forEach((star) => {
    star.position.z += 0.5; // SPEED (0.1 super pelan, 1 cepat)
    star.scale.z = 8; // bikin jadi garis

    // kalau sudah lewat kamera, reset ke belakang
    if (star.position.z > 250) {
      star.position.z = -400;
    }
  });

  renderer.render(scene, camera);
}
animate();

// ===================================
// TYPEWRITER EFFECT
// ===================================
const texts = ["Hello, I'm Petra Ginting", "Frontend & Software Quality"];

let textIndex = 0;
let index = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing-text");

function typeEffect() {
  const currentText = texts[textIndex];

  if (!isDeleting && index < currentText.length) {
    typingElement.innerHTML += currentText.charAt(index++);
  } else if (isDeleting && index > 0) {
    typingElement.innerHTML = currentText.substring(0, --index);
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    } else {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 40 : 100);
}

window.addEventListener("load", typeEffect);

// ===================================
// HAMBURGER MENU TOGGLE
// ===================================
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

if (hamburger && mobileMenu) {
  // Toggle menu saat hamburger diklik
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });

  // Close menu when clicking menu item
  const menuItems = document.querySelectorAll(".navigation-btn a");
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
    }
  });
}
