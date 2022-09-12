import React, { useRef } from 'react';
import { useDrag, useDrop } from '@react-aria/dnd';
import { v4 as uuid } from 'uuid';

import { Filter } from '../types';

const FilterItem: React.FC<{
    filter: Filter;
    setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
}> = ({ filter, setFilters }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { dragProps } = useDrag({
        getItems() {
            return [
                {
                    'text/plain': filter.id,
                },
            ];
        },
    });

    const { dropProps } = useDrop({
        async onDrop({ items }) {
            const [item] = items;
            if (item.kind !== 'text') {
                return;
            }

            const dropId = await item.getText('text/plain');
            setFilters((prevFilters) => {
                const to = prevFilters.findIndex(({ id }) => id === filter.id);
                const from = prevFilters.findIndex(({ id }) => id === dropId);
                if (from === to || from === -1 || from === -1) {
                    return prevFilters;
                }
                const newFilters = [...prevFilters];
                newFilters.splice(to, 0, newFilters.splice(from, 1)[0]);
                return newFilters;
            });
        },
        ref,
    });

    return (
        <div ref={ref} {...dragProps} {...dropProps}>
            <input
                checked={filter.active}
                onChange={() => {
                    setFilters((prevFilters) =>
                        prevFilters.map((prev) => {
                            if (prev.id !== filter.id) {
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
            <span>{filter.transformerType}</span>
            <button
                onClick={() => {
                    setFilters((prevFilters) => [
                        ...prevFilters,
                        {
                            ...filter,
                            canRemove: true,
                            id: uuid(),
                        },
                    ]);
                }}
            >
                +
            </button>
            {filter.canRemove && (
                <button
                    onClick={() => {
                        setFilters((prevFilters) =>
                            prevFilters.filter(({ id }) => id !== filter.id)
                        );
                    }}
                >
                    x
                </button>
            )}
        </div>
    );
};

export const Filters: React.FC<{
    filters: Filter[];
    setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
}> = ({ filters, setFilters }) => {
    return (
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
                <FilterItem
                    filter={filter}
                    key={filter.id}
                    setFilters={setFilters}
                />
            ))}
        </div>
    );
};
