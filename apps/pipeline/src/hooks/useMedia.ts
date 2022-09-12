import { stopMediaStream } from '@processing/camera';
import { useEffect, useState } from 'react';
import { DEFAULT_PROPS } from '../constants';

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
