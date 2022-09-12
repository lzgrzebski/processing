import { stopMediaStream } from '@processing/camera';
import { useEffect, useRef, useState } from 'react';
import { DEFAULT_PROPS } from '../constants';

export const useMedia = () => {
    const [mediaStream, setMediaStream] = useState<MediaStream>();
    const isProcessing = useRef(false);

    useEffect(() => {
        const getMedia = async () => {
            try {
                if (isProcessing.current) {
                    return;
                }
                isProcessing.current = true;
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: DEFAULT_PROPS,
                });
                setMediaStream(stream);
                isProcessing.current = false;
            } catch (reason) {
                console.error(reason);
            }
        };

        if (!mediaStream || !mediaStream.active) {
            getMedia();
        } else {
            return () => {
                stopMediaStream(mediaStream);
            };
        }
    }, [mediaStream]);

    return mediaStream;
};
