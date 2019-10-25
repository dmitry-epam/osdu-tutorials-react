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

export interface TrajectoryPoint {
  AZIMUTH: string;
  CRS: string;
  EPSG_CODE: string;
  INCLINATION: string;
  MD: string;
  TVD: string;
  UWI: string;
  WELLBORE: string;
  X: string;
  Y: string;
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
