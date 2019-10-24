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

  let prevPoint = new Vector3(0, 0, 0);
  let prevPointMeasuredDepth = 0;
  for (let i = 0; i < numberOfPoints - 1; i++) {
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

  return trajectoryObject3D;
}
