import React from 'react';

import { Item } from '../types';
import { DragAndDrop } from './DragAndDrop.view';
import { FilterItem } from './FilterItem.view';

export const Filters: React.FC<{
    filters: Item[];
    setFilters: React.Dispatch<React.SetStateAction<Item[]>>;
}> = ({ filters, setFilters }) => (
    <>
        {filters.map((filter) => (
            <DragAndDrop item={filter} key={filter.id} setItems={setFilters}>
                <FilterItem
                    filter={filter}
                    key={filter.id}
                    setFilters={setFilters}
                />
            </DragAndDrop>
        ))}
    </>
);
