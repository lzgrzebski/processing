import { CanvasTransformer, CanvasFrame, Props } from './types';
import { stopMediaStream, wrapTransformController } from './utils';

export const createVideoTrackProcessor = (
    track: MediaStreamVideoTrack,
    transformers: CanvasTransformer<CanvasFrame, CanvasFrame>[],
    props: Props
) => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const processor = new MediaStreamTrackProcessor({ track });
    const generator = new MediaStreamTrackGenerator({
        kind: 'video',
    });
    const stream = new MediaStream([generator]);
    const cancel = () => {
        stopMediaStream(stream);
        for (const transformer of transformers) {
            transformer.close();
        }
        abortController.abort('cancel');
    };

    let readable = processor.readable;
    for (const transformer of transformers) {
        transformer.init(props);
        readable = readable.pipeThrough(
            new TransformStream<VideoFrame>({
                ...transformer,
                transform: async (frame, controller) =>
                    transformer.transform?.(
                        frame,
                        wrapTransformController(frame, controller)
                    ),
            }),
            { signal }
        );
    }
    readable.pipeTo(generator.writable, { signal });

    return [stream, cancel] as const;
};
