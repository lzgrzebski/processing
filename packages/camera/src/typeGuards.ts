export const isVideoTrack = (
    track: MediaStreamTrack
): track is MediaStreamVideoTrack => track && track.kind === 'video';

export const isCanvas = (value: unknown): value is CanvasImageSource =>
    value instanceof OffscreenCanvas && 'OffscreenCanvas' in window;
