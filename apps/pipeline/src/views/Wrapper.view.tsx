import React from 'react';
import cx from 'classnames';

import styles from './Wrapper.module.css';

export const Wrapper: React.FC<
    React.PropsWithChildren<React.ComponentProps<'div'>>
> = ({ className, ...props }) => (
    <div className={cx(styles.wrapper, className)} {...props} />
);
