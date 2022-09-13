import React, { useRef } from 'react';
import { useDrag, useDrop } from '@react-aria/dnd';

import { Item } from '../types';

const DRAG_TYPE = 'text/plain';

export const DragAndDrop: React.FC<
    React.PropsWithChildren<{
        item: Item;
        setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    }>
> = ({ item, setItems, children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { dragProps } = useDrag({
        getItems() {
            return [
                {
                    [DRAG_TYPE]: item.id,
                },
            ];
        },
    });

    const { dropProps } = useDrop({
        async onDrop({ items }) {
            const [droppedValue] = items;
            if (droppedValue.kind !== 'text') {
                return;
            }

            const dropId = await droppedValue.getText(DRAG_TYPE);
            setItems((prevItems) => {
                const to = prevItems.findIndex(({ id }) => id === item.id);
                const from = prevItems.findIndex(({ id }) => id === dropId);
                if (from === to || from === -1 || from === -1) {
                    return prevItems;
                }
                const newItems = [...prevItems];
                newItems.splice(to, 0, newItems.splice(from, 1)[0]);
                return newItems;
            });
        },
        ref,
    });

    return (
        <div ref={ref} {...dragProps} {...dropProps}>
            {children}
        </div>
    );
};
