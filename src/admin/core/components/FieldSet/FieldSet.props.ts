import { DetailedHTMLProps, FieldsetHTMLAttributes } from 'react';
import { FieldsProps, LegendProps } from 'shared/components';

export interface FieldSetProps
    extends DetailedHTMLProps<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement> {
    field: FieldsProps;
    hint?: LegendProps;
    isHintReserved?: boolean;
}
