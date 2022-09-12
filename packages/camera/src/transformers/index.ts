import { blueTransformer } from './blueTransformer';
import { bwTransformer } from './bwTransformer';
import { floydSteinbergDitheringTransformer } from './floydSteinbergDitheringTransformer';
import { greenTransformer } from './greenTransformer';
import { redTransformer } from './redTransformer';

export * from './bwTransformer';
export * from './canvasTransformer';
export * from './floydSteinbergDitheringTransformer';
export * from './redTransformer';
export * from './blueTransformer';
export * from './greenTransformer';

export const TRANSFORMERS = [
    'bw',
    'floydSteinbergDithering',
    'red',
    'blue',
    'green',
] as const;
export type Transformers = typeof TRANSFORMERS[number];
export const getTransformer = (transformerType: Transformers) => {
    switch (transformerType) {
        case 'red':
            return redTransformer;
        case 'green':
            return greenTransformer;
        case 'blue':
            return blueTransformer;
        case 'bw':
            return bwTransformer;
        case 'floydSteinbergDithering':
            return floydSteinbergDitheringTransformer;
        default:
            throw new Error('Unknown transformer');
    }
};
