import { Filter, CanvasTransformer, CanvasFrame, Props } from '../types';

export const createCanvasTransformer =
    (filter: Filter) => (): CanvasTransformer<CanvasFrame, CanvasFrame> => {
        let width: number;
        let height: number;

        let canvas: OffscreenCanvas | undefined;
        let context: OffscreenCanvasRenderingContext2D | null = null;

        return {
            close() {
                canvas = undefined;
                context = null;
            },
            init(props: Props) {
                width = props.width;
                height = props.height;
                canvas = new OffscreenCanvas(width, height);
                context = canvas.getContext('2d');
            },
            transform(videoFrame, controller) {
                context?.drawImage(videoFrame, 0, 0);
                let imageData = context?.getImageData(0, 0, width, height);
                if (!imageData) {
                    return controller.enqueue(videoFrame);
                }

                imageData = filter(imageData, width, height);

                context?.putImageData(imageData, 0, 0);
                controller.enqueue(canvas);
            },
        };
    };
