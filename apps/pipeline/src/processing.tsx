import React, { useRef, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { v4 as uuid } from 'uuid';

import {
    createVideoTrackProcessor,
    getTransformer,
    isVideoTrack,
    TRANSFORMERS,
} from '@processing/camera';

import { DEFAULT_PROPS } from './constants';
import { Filter } from './types';
import { Filters } from './views/Filters.view';
import { useMedia } from './hooks/useMedia';

const FILTERS = TRANSFORMERS.map((transformerType) => ({
    active: false,
    canRemove: false,
    id: uuid(),
    transformerType,
})) as Filter[];

const Processing = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [filters, setFilters] = useState(FILTERS);

    const rawStream = useMedia();

    useEffect(() => {
        if (!rawStream || !rawStream.active) {
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
                    .map(({ transformerType }) =>
                        getTransformer(transformerType)()
                    ),
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
            <Filters filters={filters} setFilters={setFilters} />
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
