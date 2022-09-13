import React, { useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Filters } from '../views/Filters.view';
import { useProcessing } from '../hooks/useProcessing';
import { getDefaultFilters } from '../utils';
import { Video } from '../views/Video.view';
import { Wrapper } from '../views/Wrapper.view';

const Processing = () => {
    const ref = useRef<HTMLVideoElement | null>(null);
    const [filters, setFilters] = useState(getDefaultFilters);

    useProcessing(filters, ref);

    return (
        <>
            <Video ref={ref} />
            <Wrapper>
                <Filters filters={filters} setFilters={setFilters} />
            </Wrapper>
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
