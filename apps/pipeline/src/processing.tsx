import React, { useRef, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import {
    createVideoTrackProcessor,
    bwTransformer,
    floydSteinbergDitheringTransformer,
    redTransformer,
    isVideoTrack,
    stopMediaStream,
} from '@processing/camera';

const DEFAULT_PROPS = {
    height: 480,
    width: 640,
};

const TRANSFORMERS = {
    bw: bwTransformer,
    floydSteinbergDithering: floydSteinbergDitheringTransformer,
    red: redTransformer,
} as const;

interface Filter {
    active: boolean;
    id: keyof typeof TRANSFORMERS;
    position: number;
}

const FILTERS = Object.entries(TRANSFORMERS).map(([id], position) => ({
    active: false,
    id,
    position,
})) as Filter[];

const sortFilters = (filters: Filter[]) =>
    [...filters].sort((a, b) => a.position - b.position);

export const useMedia = () => {
    const [mediaStream, setMediaStream] = useState<MediaStream>();

    useEffect(() => {
        const getMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: DEFAULT_PROPS,
                });
                setMediaStream(stream);
            } catch (reason) {
                console.error(reason);
            }
        };

        if (!mediaStream) {
            getMedia();
        } else {
            return () => {
                stopMediaStream(mediaStream);
            };
        }
    }, [mediaStream]);

    return mediaStream;
};

const Processing = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [filters, setFilters] = useState(() => sortFilters(FILTERS));

    const rawStream = useMedia();

    useEffect(() => {
        if (!rawStream) {
            return;
        }
        let stream;
        let cancel: () => void | undefined;

        const [track] = rawStream.getVideoTracks();
        if (isVideoTrack(track)) {
            [stream, cancel] = createVideoTrackProcessor(
                track,
                filters
                    .filter(({ active }) => active)
                    .map(({ id }) => TRANSFORMERS[id]()),
                DEFAULT_PROPS
            );
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        }

        return () => {
            cancel?.();
        };
    }, [rawStream, filters]);

    return (
        <>
            <video
                autoPlay
                muted
                ref={videoRef}
                style={{
                    display: 'block',
                    height: '100vh',
                    objectFit: 'cover',
                    width: '100vw',
                }}
            />
            <div
                style={{
                    backgroundColor: '#fff',
                    left: 0,
                    position: 'fixed',
                    top: 0,
                    zIndex: 1,
                }}
            >
                {filters.map((filter) => (
                    <div key={filter.position}>
                        <input
                            checked={filter.active}
                            onChange={() => {
                                setFilters((prevFilters) =>
                                    prevFilters.map((prev) => {
                                        if (prev.position !== filter.position) {
                                            return prev;
                                        }
                                        return {
                                            ...prev,
                                            active: !prev.active,
                                        };
                                    })
                                );
                            }}
                            type="checkbox"
                        />{' '}
                        <span>{filter.id}</span>
                        <button
                            onClick={() => {
                                setFilters((prev) => [
                                    ...prev,
                                    { ...filter, position: filters.length },
                                ]);
                            }}
                        >
                            +
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

const ProcessingWithErrorBoundary = () => (
    <ErrorBoundary
        fallbackRender={(props) => (
            <div>
                <p>
                    Was a bit lazy to get it working without MediaTrackGenerator
                    and OffscreenCanvas.
                    <br />
                    Best to check it in chrome before I make it backward
                    compatible ;){' '}
                </p>
                <code>{props.error.toString()}</code>
            </div>
        )}
    >
        <Processing />
    </ErrorBoundary>
);

export { ProcessingWithErrorBoundary as Processing };
