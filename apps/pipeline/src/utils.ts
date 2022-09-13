import { TRANSFORMERS } from '@processing/camera';
import { v4 as uuid } from 'uuid';

import { Item } from './types';

export const getDefaultFilters = () =>
    TRANSFORMERS.map((transformerType) => ({
        active: false,
        canRemove: false,
        id: uuid(),
        transformerType,
    })) as Item[];
