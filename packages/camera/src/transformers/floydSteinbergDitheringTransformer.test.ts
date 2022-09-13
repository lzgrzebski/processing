import { floydSteinbergDitheringFilter } from './floydSteinbergDitheringTransformer';

describe('floydSteinbergDitheringFilter', () => {
    it('applies Floyd Steinberg Dithering transformation', () => {
        const initialData = new Uint8ClampedArray([
            ...[255, 0, 0, 255],
            ...[0, 255, 0, 255],
            ...[0, 0, 255, 255],
            ...[100, 100, 100, 255],
        ]);
        const imageData = new ImageData(initialData, 2, 2);

        const { data } = floydSteinbergDitheringFilter(imageData, 2, 2);
        expect(data).toMatchInlineSnapshot(`
            Uint8ClampedArray [
              255,
              0,
              0,
              255,
              0,
              255,
              255,
              255,
              0,
              0,
              0,
              255,
              0,
              0,
              0,
              255,
            ]
        `);
    });
});
