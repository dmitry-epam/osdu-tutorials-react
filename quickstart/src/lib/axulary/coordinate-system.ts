import {
  Geometry,
  Vector3,
  LineSegments,
  LineBasicMaterial,
  Object3D,
  Texture,
  LinearFilter,
  SpriteMaterial,
  Sprite,
} from 'three';
import { GridConfig } from 'lib/models/grid-config';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { TrajectoryChartConfiguration } from './chart-config';

export enum Sides {
  top,
  bottom,
  left,
  right,
}

export function createTextSprite(text: string) {
  const fontface = 'Arial';
  const fontsize = 50;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (context) {


    context.font = `${fontsize}px ${fontface}`;
    context.fillStyle = 'rgba(255, 255, 255, 1.0)';
    context.fillText(text, 0, fontsize);
  }

  const texture = new Texture(canvas);
  texture.minFilter = LinearFilter;
  texture.needsUpdate = true;

  const spriteMaterial = new SpriteMaterial({
    map: texture,
    sizeAttenuation: false
  });

  const sprite = new Sprite(spriteMaterial);
  sprite.scale.set(0.04, 0.02, 1);

  return sprite;
}

export function createTextElement(text: string) {
  const labelContainer = document.createElement('div');
  const labelElement = document.createElement('div');

  labelContainer.appendChild(labelElement);
  labelElement.textContent = text;
  labelElement.style.color = 'white';


  const labelObject = new CSS2DObject(labelContainer);

  return labelObject;
}

export function createLabel(text: string, position: Vector3) {
  const labelObject = createTextSprite(text);
  labelObject.position.copy(position);

  return labelObject;
}

export function createLabelsForGrid(
  labels: string[],
  labelsSide: Sides,
  topLeftCorner: Vector3,
  width: number,
  height: number
) {
  let x: number, y: number, dx: number, dy: number;
  const z = topLeftCorner.z;
  const labelsNumber = labels.length;
  const numberOfDivisions = labelsNumber - 1;
  const labelObjects: Object3D = new Object3D();

  switch (labelsSide) {
    case Sides.top: {
      x = topLeftCorner.x;
      y = topLeftCorner.y;
      dx = width / numberOfDivisions;
      dy = 0;
      break;
    }
    case Sides.bottom: {
      x = topLeftCorner.x;
      y = topLeftCorner.y - height;
      dx = width / numberOfDivisions;
      dy = 0;
      break;
    }
    case Sides.left: {
      x = topLeftCorner.x;
      y = topLeftCorner.y;
      dx = 0;
      dy = -height / numberOfDivisions;
      break;
    }
    case Sides.right: {
      x = topLeftCorner.x + width;
      y = topLeftCorner.y;
      dx = 0;
      dy = -height / numberOfDivisions;
      break;
    }
    default: {
      x = topLeftCorner.x + width;
      y = topLeftCorner.y;
      dx = 0;
      dy = -height / numberOfDivisions;
      break;
    }
  }

  const nextLabelCoord = new Vector3(x, y, z);
  for (let i = 0; i < labelsNumber; i++) {
    labelObjects.add(createLabel(labels[i], nextLabelCoord));

    nextLabelCoord.x += dx;
    nextLabelCoord.y += dy;
  }

  return labelObjects;
}

export function createLabels(
  distance: number,
  labels: string[],
  direction: 'x' | 'y' | 'z',
  inverseLabelsOrder: boolean
) {
  const labelsLocal = inverseLabelsOrder 
    ? labels.slice().reverse()
    : labels;
  const labelsObject = new Object3D();
  const numberOfDivisions = labels.length - 1;
  const delta = distance / numberOfDivisions;

  const nextLabelCoord = new Vector3(0, 0, 0);

  for (let i = 0; i <= numberOfDivisions; i ++) {

    labelsObject.add(createLabel(labelsLocal[i], nextLabelCoord));
    nextLabelCoord[direction] += delta;

  }

  return labelsObject;
}

export function createGrid(config: GridConfig) {
  const { width, height, widthSegments, heightSegments, color } = config;

  const segmentWidth = width / widthSegments;
  const segmentHeight = height / heightSegments;
  const geometry = new Geometry();

  const numberOfVerticalLines = widthSegments + 1;
  const numberOfHorisontalLines = heightSegments + 1;

  // vertical lines
  for (let i = 0; i < numberOfVerticalLines; i++) {
    const x = i * segmentWidth;

    geometry.vertices.push(new Vector3(x, 0, 0));
    geometry.vertices.push(new Vector3(x, height, 0));
  }

  // horisontal lines
  for (let j = 0; j < numberOfHorisontalLines; j++) {
    const y = j * segmentHeight;

    geometry.vertices.push(new Vector3(0, y, 0));
    geometry.vertices.push(new Vector3(width, y, 0));
  }

  const material = new LineBasicMaterial({ color });
  const grid = new LineSegments(geometry, material);

  return grid;
}

export function createGridedCoordinaesSystem(chartConfig: TrajectoryChartConfiguration) {
  const gridXY = createGrid({
    width: chartConfig.width,
    height: chartConfig.height,
    widthSegments: chartConfig.numberOfGridSegments,
    heightSegments: chartConfig.numberOfGridSegments,
    color: 0xffffff,
  });

  const gridYZ = createGrid({
    width: chartConfig.depth,
    height: chartConfig.height,
    widthSegments: chartConfig.numberOfGridSegments,
    heightSegments: chartConfig.numberOfGridSegments,
    color: 0xffffff,
  });
  gridYZ.rotateY(-Math.PI / 2);

  const gridXZ = createGrid({
    width: chartConfig.width,
    height: chartConfig.depth,
    widthSegments: chartConfig.numberOfGridSegments,
    heightSegments: chartConfig.numberOfGridSegments,
    color: 0xffffff,
  });
  gridXZ.rotateX(Math.PI / 2);

  const labesForAxesX = createLabels(
    chartConfig.width,
    chartConfig.widthLabels,
    'x',
    false
  );
  const labesForAxesY = createLabels(
    chartConfig.height,
    chartConfig.heightLabels,
    'y',
    true
  );
  const labesForAxesZ = createLabels(
    chartConfig.depth,
    chartConfig.depthLabels,
    'z',
    true
  );
  
  labesForAxesX.position.z = chartConfig.depth;
  labesForAxesY.position.z = chartConfig.depth;
  labesForAxesZ.position.x = chartConfig.width;

  const gridedCoordinateSystem = new Object3D();
  gridedCoordinateSystem.add(gridXY);
  gridedCoordinateSystem.add(gridXZ);
  gridedCoordinateSystem.add(gridYZ);
  gridedCoordinateSystem.add(labesForAxesX);
  gridedCoordinateSystem.add(labesForAxesY);
  gridedCoordinateSystem.add(labesForAxesZ);

  const coordinateSystemPosition = chartConfig.leftTopPoint.clone();
  coordinateSystemPosition.y -= chartConfig.height;

  gridedCoordinateSystem.position.copy(coordinateSystemPosition);

  return gridedCoordinateSystem;
}
