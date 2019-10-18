export interface TrajectoryPoint {
  MeasuredDepth: number;
  Inclination: number;
  Azimuth: number;
}

export interface Trajectory {
  points: TrajectoryPoint[];
}
