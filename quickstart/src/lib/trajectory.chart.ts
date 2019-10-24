import {
  createCamera,
  createCameraControl,
  createRenderer,
  createScene,
  createCSS2Renderer,
  setUpCameraForChart,
} from './axulary/scene';
import { createTrajectoryIn3D } from './axulary/trajectory';
import { trajectoryMock } from './mocked-data/trajectory-mock';
import { createGridedCoordinaesSystem } from './axulary/coordinate-system';
import { createSurfaceImitationPlane } from './axulary/axulary-3d-objects';
import { createChartRootElement } from './axulary/DOM-layout';
import { calcChartConfiguration } from './axulary/chart-config';
import { Vector3 } from 'three';

export function createTrajectoryChart(container: HTMLElement) {
  const root = createChartRootElement();
  container.appendChild(root);

  const renderer = createRenderer(root);
  const css2DRenderer = createCSS2Renderer(root);
  const scene = createScene();
  const camera = createCamera(renderer);
  const cameraControl = createCameraControl(camera, renderer.domElement);

  const trajectory = createTrajectoryIn3D(trajectoryMock);
  const trajectoryOnChartCoordinates = new Vector3(0, 0, 0);
  const trajectoryRealWorldCoordinates = new Vector3(
    trajectoryMock.points[0].x,
    trajectoryMock.points[0].measuredDepth,
    trajectoryMock.points[0].y,
  );

  const chartConfig = calcChartConfiguration(
    trajectory,
    trajectoryOnChartCoordinates,
    trajectoryRealWorldCoordinates
  );
  const coordinatesSystem = createGridedCoordinaesSystem(chartConfig);
  const surfaceImitationPlane = createSurfaceImitationPlane(chartConfig);

  scene.add(trajectory);
  scene.add(coordinatesSystem);
  scene.add(surfaceImitationPlane);

  setUpCameraForChart(
    camera,
    cameraControl,
    chartConfig
  );

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
