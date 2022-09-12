import { createCanvasTransformer } from './canvasTransformer';

const redFilter = (imageData: ImageData) => {
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i + 1] = 0;
        imageData.data[i + 2] = 0;
    }
    return imageData;
};

export const redTransformer = createCanvasTransformer(redFilter);
