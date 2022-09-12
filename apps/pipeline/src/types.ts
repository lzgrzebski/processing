import {
    bwTransformer,
    floydSteinbergDitheringTransformer,
    redTransformer,
} from '@processing/camera';

export const TRANSFORMERS = {
    bw: bwTransformer,
    floydSteinbergDithering: floydSteinbergDitheringTransformer,
    red: redTransformer,
} as const;

export interface Filter {
    active: boolean;
    transformerType: keyof typeof TRANSFORMERS;
    id: string;
    canRemove: boolean;
}
