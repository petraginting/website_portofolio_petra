import * as THREE from "three";

let starSystem;

export function createStars(scene, isMobile) {
  const starCount = isMobile ? 150 : 300;
  
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(starCount * 2 * 3); // 2 vertices per star

  for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 800;
    const y = (Math.random() - 0.5) * 800;
    const z = -Math.random() * 500;
    
    // start point
    positions[i * 6] = x;
    positions[i * 6 + 1] = y;
    positions[i * 6 + 2] = z;
    // end point (streak)
    positions[i * 6 + 3] = x;
    positions[i * 6 + 4] = y;
    positions[i * 6 + 5] = z - 8; // length of the streak
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.6
  });

  starSystem = new THREE.LineSegments(geometry, material);
  scene.add(starSystem);
}

export function updateStars() {
  if (!starSystem) return;

  const positionsAttr = starSystem.geometry.attributes.position;
  const array = positionsAttr.array;

  for (let i = 0; i < array.length; i += 6) {
    array[i + 2] += 0.5; // Update z of start point
    array[i + 5] += 0.5; // Update z of end point

    if (array[i + 2] > 250) {
      array[i + 2] = -400;
      array[i + 5] = -400 - 8;
    }
  }

  positionsAttr.needsUpdate = true;
}
