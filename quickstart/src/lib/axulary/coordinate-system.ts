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
import { GridConfig } from '../models/grid-config';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

export enum Sides {
  top,
  bottom,
  left,
  right,
}

export function createTextElement(text: string) {
  const labelDOM = document.createElement('div');
  labelDOM.className = 'trajectory-chart__CSS-2D-label';
  labelDOM.textContent = text;
  labelDOM.style.color = 'white';
  const labelObject = new CSS2DObject(labelDOM);

  return labelObject;
}

export function createLabel(text: string, position: Vector3) {
  const labelObject = createTextElement(text);
  labelObject.position.copy(position);

  return labelObject;
}

export function createLabelsText(minVal: number, maxVal: number, numberOfDivisions: number) {
  const labels: string[] = [];
  const delta: number = (maxVal - minVal) / numberOfDivisions;

  for (let i = 0; i < numberOfDivisions + 1; i++) {
    const nextVal = minVal + delta * i;
    labels.push(nextVal.toString());
  }

  return labels;
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

export function createTextSprite(text: string) {
  const fontface = 'Arial';
  const fontsize = 10;
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
  });

  const sprite = new Sprite(spriteMaterial);
  sprite.center.set(0, 3);
  return sprite;
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

export function createGridedCoordinaesSystem() {
  const gridXY = createGrid({
    width: 10,
    height: 10,
    widthSegments: 10,
    heightSegments: 10,
    color: 0xffffff,
  });

  const gridYZ = createGrid({
    width: 10,
    height: 10,
    widthSegments: 10,
    heightSegments: 10,
    color: 0xffffff,
  });
  gridYZ.rotateY(-Math.PI / 2);

  const gridXZ = createGrid({
    width: 10,
    height: 10,
    widthSegments: 10,
    heightSegments: 10,
    color: 0xffffff,
  });
  gridXZ.rotateX(Math.PI / 2);

  const labels = createLabelsText(0, 10, 10);
  const labesForAxesX = createLabelsForGrid(labels, Sides.top, new Vector3(0, 10, 0), 10, 10);
  const labesForAxesY = createLabelsForGrid(labels, Sides.right, new Vector3(0, 10, 0), 10, 10);
  const labesForAxesZ = createLabelsForGrid(labels, Sides.right, new Vector3(0, 10, 0), 10, 10);
  labesForAxesX.rotateX(Math.PI / 2);
  labesForAxesY.rotateY(-Math.PI / 2);
  labesForAxesZ.rotateX(Math.PI / 2);

  const gridedCoordinateSystem = new Object3D();
  gridedCoordinateSystem.add(gridXY);
  gridedCoordinateSystem.add(gridXZ);
  gridedCoordinateSystem.add(gridYZ);
  gridedCoordinateSystem.add(labesForAxesX);
  gridedCoordinateSystem.add(labesForAxesY);
  gridedCoordinateSystem.add(labesForAxesZ);

  gridedCoordinateSystem.position.set(-10 / 2, -10 / 2, -10 / 2);

  return gridedCoordinateSystem;
}
