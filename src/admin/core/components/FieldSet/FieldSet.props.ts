import { DetailedHTMLProps, FieldsetHTMLAttributes } from 'react';
import { FieldsProps, LegendProps } from 'shared/components';

export interface FieldSetProps
    extends Omit<DetailedHTMLProps<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>, 'ref'> {
    field: FieldsProps;
    hint?: LegendProps;
    isHintReserved?: boolean;
}
