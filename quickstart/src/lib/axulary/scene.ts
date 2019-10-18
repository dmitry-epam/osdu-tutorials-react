import { PerspectiveCamera, Scene, WebGLRenderer, AxesHelper, Camera, Renderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

export function createRenderer(container: HTMLElement) {
  const sceneWidth = container.clientWidth;
  const sceneHeight = container.clientHeight;

  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(sceneWidth, sceneHeight);

  container.appendChild(renderer.domElement);

  return renderer;
}

export function createCSS2Renderer(container: HTMLElement) {
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.domElement.classList.add('trajectory-chart__CSS-2D-renderer-layer');
  labelRenderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(labelRenderer.domElement);

  return labelRenderer;
}

export function createCamera(renderer: Renderer) {
  const sceneWidth = renderer.domElement.clientWidth;
  const sceneHeight = renderer.domElement.clientHeight;

  const fieldOfVision = 30;
  const aspectRatio = sceneWidth / sceneHeight;
  const nearPlane = 0.1;
  const farPlane = 10000;

  const camera = new PerspectiveCamera(fieldOfVision, aspectRatio, nearPlane, farPlane);

  camera.lookAt(0, 0, 0);
  camera.position.set(0, 10, 10);

  return camera;
}

export function createScene() {
  const scene = new Scene();

  return scene;
}

export function createAxesHelper() {
  const axes = new AxesHelper(10);
  axes.position.set(0, 0, 0);

  return axes;
}

export function createCameraControl(camera: Camera, canvas: HTMLCanvasElement) {
  const cameraControl = new OrbitControls(camera, canvas);
  cameraControl.rotateSpeed = 5;

  return cameraControl;
}
