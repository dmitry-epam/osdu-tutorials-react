import { TrajectoryPoint, TrajectoryDataPoint } from 'lib/models/trajectory-data';

export function toTrajectoryPoint(point: TrajectoryPoint): TrajectoryDataPoint {
  return {
    measuredDepth: Number(point.MD),
    azimuth: Number(point.AZIMUTH),
    inclination: Number(point.INCLINATION),
    x: Number(point.X),
    y: Number(point.Y),
  };
}

export function responseToTrajectoryPoints(points: TrajectoryPoint[]): TrajectoryDataPoint[] {
  const result = points.map(point => toTrajectoryPoint(point));
  result.pop();
  return result;
}
