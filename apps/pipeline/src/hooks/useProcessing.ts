import {
    isVideoTrack,
    createVideoTrackProcessor,
    getTransformer,
} from '@processing/camera';
import { RefObject, useEffect } from 'react';
import { DEFAULT_PROPS } from '../constants';
import { Item } from '../types';
import { useMedia } from './useMedia';

export const useProcessing = (
    filters: Item[],
    videoRef: RefObject<HTMLVideoElement>
) => {
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
};
