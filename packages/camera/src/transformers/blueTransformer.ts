import { createCanvasTransformer } from './canvasTransformer';

const blueFilter = (imageData: ImageData) => {
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i + 0] = 0;
        imageData.data[i + 1] = 0;
    }
    return imageData;
};

export const blueTransformer = createCanvasTransformer(blueFilter);
