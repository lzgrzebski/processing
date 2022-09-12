import { createCanvasTransformer } from './canvasTransformer';

const greenFilter = (imageData: ImageData) => {
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i + 0] = 0;
        imageData.data[i + 2] = 0;
    }
    return imageData;
};

export const greenTransformer = createCanvasTransformer(greenFilter);
