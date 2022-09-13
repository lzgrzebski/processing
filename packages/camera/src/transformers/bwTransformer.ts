import { createCanvasTransformer } from './canvasTransformer';

export const bwFilter = (imageData: ImageData) => {
    for (let i = 0; i < imageData.data.length; i += 4) {
        const bw =
            (imageData.data[i] +
                imageData.data[i + 1] +
                imageData.data[i + 2]) /
            3;
        imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = bw;
    }
    return imageData;
};

export const bwTransformer = createCanvasTransformer(bwFilter);
