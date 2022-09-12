import { isCanvas } from './typeGuards';
import { CanvasFrame } from './types';

export const stopMediaStream = (stream: MediaStream | undefined) => {
    if (!stream) {
        return;
    }
    for (const track of stream.getTracks()) {
        track.stop();
    }
};

export const wrapTransformController = (
    videoFrame: VideoFrame,
    controller: TransformStreamDefaultController<VideoFrame>
): TransformStreamDefaultController<CanvasFrame> => ({
    ...controller,
    enqueue(frame) {
        if (!frame) {
            return frame;
        }
        if (frame instanceof VideoFrame) {
            return controller.enqueue(frame);
        }
        if (isCanvas(frame)) {
            videoFrame.close();
            return controller.enqueue(
                new VideoFrame(frame, {
                    timestamp: videoFrame.timestamp ?? 0,
                })
            );
        }
        throw new Error('Unexpected frame');
    },
});
