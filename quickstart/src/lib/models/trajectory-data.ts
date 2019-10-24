export interface TrajectoryDataPoint {
  measuredDepth: number;
  inclination: number;
  azimuth: number;
  x: number,
  y: number
}

export interface TrajectoryData {
  points: TrajectoryDataPoint[];
}

export interface TrajectoryMockPoint {
  md: number;
  inclination: number;
  azimuth: number;
  tvd: number;
  ns: number;
  ew: number;
  x: number;
  y: number;
}
