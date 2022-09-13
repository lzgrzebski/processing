import React from 'react';
import cx from 'classnames';

import styles from './Video.module.css';

export const Video = React.forwardRef<
    HTMLVideoElement,
    React.ComponentProps<'video'>
>(({ className, ...props }, ref) => (
    <video
        autoPlay
        className={cx(styles.video, className)}
        muted
        ref={ref}
        {...props}
    />
));

Video.displayName = 'Video';
