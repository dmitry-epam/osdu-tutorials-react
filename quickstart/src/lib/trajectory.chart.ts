import {
  createCamera,
  createCameraControl,
  createRenderer,
  createScene,
  createCSS2Renderer,
} from './axulary/scene';
import { createTrajectoryIn3D } from './axulary/trajectory';
import { trajectoryMock } from './mocked-data/trajectory-mock';
import { createGridedCoordinaesSystem } from './axulary/coordinate-system';
import { createSurfaceImitationPlane } from './axulary/axulary-3d-objects';
import { createChartRootElement } from './axulary/DOM-layout';

export function createTrajectoryChart(container: HTMLElement) {
  const root = createChartRootElement();
  container.appendChild(root);

  const renderer = createRenderer(root);
  const css2DRenderer = createCSS2Renderer(root);
  const scene = createScene();
  const camera = createCamera(renderer);
  const cameraControl = createCameraControl(camera, renderer.domElement);
  const coordinatesSystem = createGridedCoordinaesSystem();
  const trajectory = createTrajectoryIn3D(trajectoryMock);
  const surfaceImitationPlane = createSurfaceImitationPlane();

  scene.add(trajectory);
  scene.add(coordinatesSystem);
  scene.add(surfaceImitationPlane);

  trajectory.scale.set(0.001, 0.001, 0.001);
  trajectory.position.setY(5);
  surfaceImitationPlane.position.setY(5);

  function render() {
    renderer.render(scene, camera);
    css2DRenderer.render(scene, camera);
  }

  function renderLoop() {
    cameraControl.update();
    render();
    requestAnimationFrame(renderLoop);
  }

  renderLoop();
}
