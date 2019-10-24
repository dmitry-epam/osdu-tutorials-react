import { TrajectoryData, TrajectoryDataPoint } from 'lib/models/trajectory-data';
import { Geometry, LineBasicMaterial, Line, Vector3 } from 'three';

function calculateNextTrajectoryPoint(
  prev: Vector3,
  prevPointMeasuredDepth: number,
  nextPointData: TrajectoryDataPoint
): Vector3 {
  const nextPoint = new Vector3();
  const degToRad = Math.PI / 180;

  const depthDelta = nextPointData.measuredDepth - prevPointMeasuredDepth;
  const dx =
    depthDelta *
    Math.sin(degToRad * nextPointData.inclination) *
    Math.cos(degToRad * nextPointData.azimuth);
  const dy = -depthDelta * Math.cos(degToRad * nextPointData.inclination);
  const dz =
    depthDelta *
    Math.sin(degToRad * nextPointData.inclination) *
    Math.sin(degToRad * nextPointData.azimuth);

  nextPoint.x = prev.x + dx; //width and north direction
  nextPoint.y = prev.y + dy; //depth
  nextPoint.z = prev.z + dz; //height

  return nextPoint;
}

function calculateTrajectoryPointsIn3D(trajectory: TrajectoryData): Vector3[] {
  const pointsIn3D: Vector3[] = [];
  const numberOfPoints: number = trajectory.points.length;

  const firstPointData = trajectory.points[0];
  const firstPoint = new Vector3(
    0,
    firstPointData.measuredDepth,
    0
  );
  pointsIn3D.push(firstPoint);

  let prevPoint = firstPoint.clone();
  let prevPointMeasuredDepth = firstPointData.measuredDepth;
  for (let i = 1; i < numberOfPoints - 1; i++) {
    const nextPointData = trajectory.points[i];

    const nextPoint = calculateNextTrajectoryPoint(
      prevPoint,
      prevPointMeasuredDepth,
      nextPointData
    );
    pointsIn3D.push(nextPoint);

    prevPoint = nextPoint;
    prevPointMeasuredDepth = nextPointData.measuredDepth;
  }

  return pointsIn3D;
}

function createLineIn3D(points: Vector3[]): Line {
  const lineGeometry = new Geometry();
  lineGeometry.vertices.push(...points);

  const lineMaterial = new LineBasicMaterial({
    color: 'yellow',
    linewidth: 3,
  });

  const line = new Line(lineGeometry, lineMaterial);

  return line;
}

export function createTrajectoryIn3D(trajectory: TrajectoryData) {
  const points = calculateTrajectoryPointsIn3D(trajectory);
  const trajectoryObject3D = createLineIn3D(points);

  const trajectoryFirstPointHeight = points[0].y;
  trajectoryObject3D.translateY(-trajectoryFirstPointHeight);

  return trajectoryObject3D;
}
