import React from 'react';
import cx from 'classnames';
import { useHover } from 'react-aria';
import { v4 as uuid } from 'uuid';

import { Item } from '../types';
import { Button } from './Button.view';
import { Text } from './Text.view';

import styles from './FilterItem.module.css';
import { Checkbox } from './Checkbox.view';

export const FilterItem: React.FC<{
    filter: Item;
    setFilters: React.Dispatch<React.SetStateAction<Item[]>>;
}> = ({ filter, setFilters }) => {
    const { hoverProps, isHovered } = useHover({});
    return (
        <div
            className={cx(styles.filter, isHovered && styles.hovered)}
            {...hoverProps}
        >
            <div className={styles.content}>
                <Checkbox
                    checked={filter.active}
                    onChange={() =>
                        setFilters((prevFilters) =>
                            prevFilters.map((prev) =>
                                prev.id !== filter.id
                                    ? prev
                                    : {
                                          ...prev,
                                          active: !prev.active,
                                      }
                            )
                        )
                    }
                >
                    <Text>{filter.transformerType}</Text>
                </Checkbox>
            </div>
            {isHovered && (
                <div className={styles.actions}>
                    {filter.canRemove && (
                        <Button
                            onPress={() =>
                                setFilters((prevFilters) =>
                                    prevFilters.filter(
                                        ({ id }) => id !== filter.id
                                    )
                                )
                            }
                        >
                            x
                        </Button>
                    )}
                    <Button
                        className={styles.action}
                        onPress={() =>
                            setFilters((prevFilters) => [
                                ...prevFilters,
                                {
                                    ...filter,
                                    canRemove: true,
                                    id: uuid(),
                                },
                            ])
                        }
                    >
                        +
                    </Button>
                </div>
            )}
        </div>
    );
};
