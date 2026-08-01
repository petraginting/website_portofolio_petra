import * as THREE from "three";

export function addLights(scene) {
  const pointLight = new THREE.PointLight(0xffffff, 100);
  pointLight.position.set(30, 30, 30);
  scene.add(pointLight);

  const ambient = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambient);

  const sunLight = new THREE.DirectionalLight(0xffffff, 5);
  sunLight.position.set(-10, 20, 10);
  scene.add(sunLight);
}
