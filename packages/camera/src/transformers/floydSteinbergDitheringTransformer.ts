import { createCanvasTransformer } from './canvasTransformer';

export const floydSteinbergDitheringFilter = (
    imageData: ImageData,
    width: number,
    height: number
) => {
    const index = (x: number, y: number) => (x + y * width) * 4;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = index(x, y);

            const r = imageData?.data[i] ?? 0;
            const g = imageData?.data[i + 1] ?? 0;
            const b = imageData?.data[i + 2] ?? 0;

            const factor = 1;

            const newR = Math.round((factor * r) / 255) * (255 / factor);
            const newG = Math.round((factor * g) / 255) * (255 / factor);
            const newB = Math.round((factor * b) / 255) * (255 / factor);

            imageData.data[i] = newR;
            imageData.data[i + 1] = newG;
            imageData.data[i + 2] = newB;

            const errR = r - newR;
            const errG = g - newG;
            const errB = b - newB;

            // x+1
            imageData.data[index(x + 1, y)] =
                imageData?.data[index(x + 1, y)] + (errR * 7) / 16;

            imageData.data[index(x + 1, y) + 1] =
                imageData?.data[index(x + 1, y) + 1] + (errG * 7) / 16;

            imageData.data[index(x + 1, y) + 2] =
                imageData?.data[index(x + 1, y) + 1] + (errB * 7) / 16;

            // x-1,y+1
            imageData.data[index(x - 1, y + 1)] =
                imageData?.data[index(x - 1, y + 1)] + (errR * 3) / 16;

            imageData.data[index(x - 1, y + 1) + 1] =
                imageData?.data[index(x - 1, y + 1) + 1] + (errG * 3) / 16;

            imageData.data[index(x - 1, y + 1) + 2] =
                imageData?.data[index(x - 1, y + 1) + 1] + (errB * 3) / 16;

            // x,y+1
            imageData.data[index(x, y + 1)] =
                imageData?.data[index(x, y + 1)] + (errR * 5) / 16;

            imageData.data[index(x, y + 1) + 1] =
                imageData?.data[index(x, y + 1) + 1] + (errG * 5) / 16;

            imageData.data[index(x, y + 1) + 2] =
                imageData?.data[index(x, y + 1) + 1] + (errB * 5) / 16;

            // x+1,y+1
            imageData.data[index(x + 1, y + 1)] =
                imageData?.data[index(x + 1, y + 1)] + (errR * 1) / 16;

            imageData.data[index(x + 1, y + 1) + 1] =
                imageData?.data[index(x + 1, y + 1) + 1] + (errG * 1) / 16;

            imageData.data[index(x + 1, y + 1) + 2] =
                imageData?.data[index(x + 1, y + 1) + 1] + (errB * 1) / 16;
        }
    }

    return imageData;
};

export const floydSteinbergDitheringTransformer = createCanvasTransformer(
    floydSteinbergDitheringFilter
);
