import {
  createCamera,
  createCameraControl,
  createRenderer,
  createScene,
  setUpCameraForChart,
} from './axulary/scene';
import {calculateTrajectoryPointsIn3D, createTrajectoryLine} from './axulary/trajectory';
import {createGridedCoordinaesSystem} from './axulary/coordinate-system';
import {createSurfaceImitationPlane} from './axulary/axulary-3d-objects';
import {createChartRootElement} from './axulary/DOM-layout';
import {calcChartConfiguration} from './axulary/chart-config';
import {Vector3} from 'three';
import {TrajectoryData} from './models/trajectory-data';

export function createTrajectoryChart(container: HTMLElement, trajectoryData: TrajectoryData) {
  const root = createChartRootElement();
  container.appendChild(root);

  const renderer = createRenderer(root);
  const scene = createScene();
  const camera = createCamera(renderer);
  const cameraControl = createCameraControl(camera, renderer.domElement);

  const trajectoryPoints = calculateTrajectoryPointsIn3D(trajectoryData);
  const trajectoryRealWorldCoordinates = new Vector3(
    trajectoryData.points[0].x,
    -trajectoryData.points[0].measuredDepth,
    trajectoryData.points[0].y,
  );
  const chartTopCenterPoint = new Vector3(0, 0, 0);
  const chartConfig = calcChartConfiguration(
    trajectoryPoints,
    chartTopCenterPoint,
    trajectoryRealWorldCoordinates
  );

  const trajectory = createTrajectoryLine(trajectoryPoints);
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
  }

  function renderLoop() {
    cameraControl.update();
    render();
    requestAnimationFrame(renderLoop);
  }

  renderLoop();

  window.addEventListener('resize', () => {
    camera.aspect = root.clientWidth / root.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( root.clientWidth, root.clientHeight );
  })
}
