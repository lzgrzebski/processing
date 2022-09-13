import { createCanvasTransformer } from './canvasTransformer';

const area = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
) => Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);

const isInside = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x: number,
    y: number
) => {
    const a = area(x1, y1, x2, y2, x3, y3);

    const a1 = area(x, y, x2, y2, x3, y3);
    const a2 = area(x1, y1, x, y, x3, y3);
    const a3 = area(x1, y1, x2, y2, x, y);

    return a === a1 + a2 + a3;
};

const rotate = (
    ax: number,
    ay: number,
    angle: number,
    bx: number,
    by: number
) => {
    const rad = (Math.PI / 180) * angle;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const run = bx - ax;
    const rise = by - ay;

    return [
        Math.floor(cos * run + sin * rise + ax),
        Math.floor(cos * rise - sin * run + ay),
    ];
};

const symmetry = 6;
const angle = 360 / symmetry;

const kaleidoscopeFilter = (
    imageData: ImageData,
    width: number,
    height: number
) => {
    const radius = Math.round(Math.min(width, height));
    const cx = width / 2;
    const cy = height / 2;
    const firstSection = [
        cx - radius / 2,
        0,
        cx,
        cy,
        cx + radius / 2,
        0,
    ] as const;

    const index = (x: number, y: number) => (x + y * width) * 4;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (!isInside(...firstSection, x, y)) {
                continue;
            }
            const i = index(x, y);

            for (let s = 0; s < symmetry; s++) {
                const [sx, sy] = rotate(cx, cy, angle * s, x, y);
                const sector = index(sx, sy);

                imageData.data[sector + 0] = imageData.data[i + 0];
                imageData.data[sector + 1] = imageData.data[i + 1];
                imageData.data[sector + 2] = imageData.data[i + 2];
            }
        }
    }

    return imageData;
};

export const kaleidoscopeTransformer =
    createCanvasTransformer(kaleidoscopeFilter);
