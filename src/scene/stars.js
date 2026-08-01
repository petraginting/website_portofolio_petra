import * as THREE from "three";

const stars = [];

export function createStars(scene, isMobile) {
  const starCount = isMobile ? 150 : 300;

  for (let i = 0; i < starCount; i++) {
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
}

export function updateStars() {
  stars.forEach((star) => {
    star.position.z += 0.5;
    star.scale.z = 8;

    if (star.position.z > 250) {
      star.position.z = -400;
    }
  });
}
