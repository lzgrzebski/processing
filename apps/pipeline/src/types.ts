import { Transformers } from '@processing/camera';
export interface Item {
    active: boolean;
    transformerType: Transformers;
    id: string;
    canRemove: boolean;
}
