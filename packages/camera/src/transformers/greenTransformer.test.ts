import { greenFilter } from './greenTransformer';

describe('greenFilter', () => {
    it('it makes everything green', () => {
        const red = [255, 0, 0, 255];
        const green = [0, 255, 0, 255];
        const blue = [0, 0, 255, 255];

        const initialData = new Uint8ClampedArray([...red, ...green, ...blue]);
        const imageData = new ImageData(initialData, 3, 1);

        const { data } = greenFilter(imageData);
        expect(data).toMatchInlineSnapshot(`
            Uint8ClampedArray [
              0,
              0,
              0,
              255,
              0,
              255,
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
