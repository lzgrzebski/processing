export interface CanvasTransformer<I, O> extends Transformer<I, O> {
    init(props: Props): void;
    close(): void;
}

export interface Props {
    height: number;
    width: number;
}

export type CanvasFrame = OffscreenCanvas | VideoFrame;

export type Filter = (
    imageData: ImageData,
    width: number,
    height: number
) => ImageData;
