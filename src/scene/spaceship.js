import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

let spaceship = null;
let mixer = null;

export function loadSpaceship(scene) {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
  
  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  
  loader.load(
    "/models/spaceship-draco.glb",
    (gltf) => {
      spaceship = gltf.scene;

      spaceship.traverse((node) => {
        if (node.isMesh) {
          node.material.wireframe = true;
          node.material.emissive = new THREE.Color(0xdc2628);
          node.material.emissiveIntensity = 10000;
        }
      });

      spaceship.scale.set(6, 6, 6);
      spaceship.position.set(0, 8, 0);
      scene.add(spaceship);

      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(spaceship);
        mixer.clipAction(gltf.animations[0]).play();
      }
    },
    undefined,
    (error) => console.error("Error loading spaceship:", error),
  );
}

export function updateSpaceship(delta, targetRotX, targetRotY) {
  if (mixer) mixer.update(delta);
  if (!spaceship) return;

  spaceship.rotation.x += (targetRotX - spaceship.rotation.x) * 0.08;
  spaceship.rotation.y += (targetRotY - spaceship.rotation.y) * 0.08;
  spaceship.rotation.y += 0.0005; // idle rotation
}

export function getSpaceship() {
  return spaceship;
}
