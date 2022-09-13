import { redFilter } from './redTransformer';

describe('redFilter', () => {
    it('it makes everything red', () => {
        const red = [255, 0, 0, 255];
        const green = [0, 255, 0, 255];
        const blue = [0, 0, 255, 255];

        const initialData = new Uint8ClampedArray([...red, ...green, ...blue]);
        const imageData = new ImageData(initialData, 3, 1);

        const { data } = redFilter(imageData);
        expect(data).toMatchInlineSnapshot(`
            Uint8ClampedArray [
              255,
              0,
              0,
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
