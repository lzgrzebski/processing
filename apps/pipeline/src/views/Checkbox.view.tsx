import React from 'react';
import cx from 'classnames';

import styles from './Checkbox.module.css';

export const Checkbox: React.FC<React.ComponentProps<'input'>> = ({
    className,
    children,
    ...props
}) => (
    <label className={cx(styles.label, className)}>
        <input
            className={cx(styles.checkbox, className)}
            {...props}
            type="checkbox"
        />
        {children}
    </label>
);
