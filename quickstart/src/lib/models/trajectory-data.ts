export interface TrajectoryPoint {
  MeasuredDepth: number;
  Inclination: number;
  Azimuth: number;
}

export interface Trajectory {
  points: TrajectoryPoint[];
}

export interface TrajectoryMockPoint {
  md: number;
  inclination: number;
  azimuth: number;
  tvd: number;
  ns: number;
  ew: number;
}
