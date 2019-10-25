import { Vector2 } from 'three';

export interface LabelShift {
    multiplier: number;
    dimension: 'width' | 'height';
}

export interface LabelConfig {
    shiftX?: LabelShift;
    shiftY?: LabelShift
    shiftZ?: LabelShift

    rotationCenter: Vector2;
}