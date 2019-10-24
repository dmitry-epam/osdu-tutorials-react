import { Object3D, Box3, Vector3 } from 'three';
import { makeVectorCoordinatesPositive } from './math';

export interface TrajectoryChartConfiguration {
    width: number;
    height: number;
    depth: number;

    numberOfGridSegments: number;

    widthLabels: string[];
    heightLabels: string[];
    depthLabels: string[];

    leftTopPoint: Vector3;
    centerPoint: Vector3;
}

export function createLabelsText(minVal: number, maxVal: number, numberOfDivisions: number) {
    const labels: string[] = [];
    const delta: number = (maxVal - minVal) / numberOfDivisions;
  
    for (let i = 0; i < numberOfDivisions + 1; i++) {
      const nextVal = minVal + delta * i;
      labels.push(nextVal.toFixed(0));
    }
  
    return labels;
}

export function calcSpaceRequiredForTrajectory(
    trajectoryObj: Object3D,
    trajectoryStartPoint: Vector3
): Vector3 {
    const boundingBox = new Box3().setFromObject(trajectoryObj);

    const byAxisDistanceFromStartToMinPoint = makeVectorCoordinatesPositive(
        trajectoryStartPoint.clone().sub(boundingBox.min.clone())
    );
    const byAxisDistanceFromStartToMaxPoint = makeVectorCoordinatesPositive(
        trajectoryStartPoint.clone().sub(boundingBox.max.clone())
    );

    const greatestDistanceFromStartPointBySingleAxis = Math.max(
        byAxisDistanceFromStartToMinPoint.x * 2,
        byAxisDistanceFromStartToMinPoint.z * 2,
        byAxisDistanceFromStartToMinPoint.y,

        byAxisDistanceFromStartToMaxPoint.x * 2,
        byAxisDistanceFromStartToMaxPoint.z * 2,
        byAxisDistanceFromStartToMaxPoint.y,
    );

    return new Vector3(
        greatestDistanceFromStartPointBySingleAxis,
        greatestDistanceFromStartPointBySingleAxis,
        greatestDistanceFromStartPointBySingleAxis
    );
}

export function calcChartConfiguration(
    trajectoryObj: Object3D,
    trajectoryStartPoint: Vector3,
    realWorldTrajectoryCoordinates: Vector3
) {
    const config = {
        numberOfGridSegments: 5
    } as TrajectoryChartConfiguration;

    const spaceForTrajectory = calcSpaceRequiredForTrajectory(
        trajectoryObj,
        trajectoryStartPoint
    );

    const centerPoint = trajectoryStartPoint.clone();
    centerPoint.y -= spaceForTrajectory.y / 2;

    const startPoint = new Vector3();
    startPoint.x = trajectoryStartPoint.x - spaceForTrajectory.x / 2;
    startPoint.y = trajectoryStartPoint.y;
    startPoint.z = trajectoryStartPoint.z - spaceForTrajectory.z / 2;

    const minHeight = realWorldTrajectoryCoordinates.y;
    const maxHeight = realWorldTrajectoryCoordinates.y + spaceForTrajectory.y;
    const labelsForHeight = createLabelsText(
        minHeight,
        maxHeight,
        config.numberOfGridSegments
    );

    const minDepth = realWorldTrajectoryCoordinates.z - spaceForTrajectory.z / 2;
    const maxDepth = realWorldTrajectoryCoordinates.z + spaceForTrajectory.z / 2;
    const labelsForDepth = createLabelsText(
        minDepth,
        maxDepth,
        config.numberOfGridSegments
    );

    const minWidth = realWorldTrajectoryCoordinates.x - spaceForTrajectory.x / 2;
    const maxWidth = realWorldTrajectoryCoordinates.x + spaceForTrajectory.x / 2;
    const labelsForWidth = createLabelsText(
        minWidth,
        maxWidth,
        config.numberOfGridSegments
    );

    config.height = spaceForTrajectory.y;
    config.width = spaceForTrajectory.x;
    config.depth = spaceForTrajectory.z;

    config.heightLabels = labelsForHeight;
    config.depthLabels = labelsForDepth;
    config.widthLabels = labelsForWidth;

    config.leftTopPoint = startPoint;
    config.centerPoint = centerPoint;

    return config;
}
