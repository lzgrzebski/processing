import { createCanvasTransformer } from './canvasTransformer';

const kaleidoscopeFilter = (imageData: ImageData) => {
    return imageData;
};

export const kaleidoscopeTransformer =
    createCanvasTransformer(kaleidoscopeFilter);
