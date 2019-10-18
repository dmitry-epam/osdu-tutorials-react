import { PlaneGeometry, MeshBasicMaterial, Mesh, DoubleSide } from 'three';

export function createSurfaceImitationPlane() {
  const geometry = new PlaneGeometry(10, 10);
  const material = new MeshBasicMaterial({ color: '#00a4a5', side: DoubleSide });
  const plane = new Mesh(geometry, material);

  plane.rotateX(Math.PI / 2);

  return plane;
}
