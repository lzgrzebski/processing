import { Transformers } from '@processing/camera';
export interface Filter {
    active: boolean;
    transformerType: Transformers;
    id: string;
    canRemove: boolean;
}
