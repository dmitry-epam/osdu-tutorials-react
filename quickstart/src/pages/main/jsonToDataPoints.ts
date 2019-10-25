import {TrajectoryPoint, TrajectoryDataPoint} from 'lib/models/trajectory-data';

export function toTrajectoryPoint(obj: TrajectoryPoint): TrajectoryDataPoint {
  return {
    measuredDepth: Number(obj.MD),
    azimuth: Number(obj.AZIMUTH),
    inclination: Number(obj.INCLINATION),
    x: Number(obj.X),
    y: Number(obj.Y)
  };
};

export function responseToTrajectoryPoints(res: TrajectoryPoint[]): TrajectoryDataPoint[] {
   const result = res.map(obj => toTrajectoryPoint(obj));
   result.pop();
   return result;
};
