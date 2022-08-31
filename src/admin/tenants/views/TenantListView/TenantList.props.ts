/* props */
import { FieldSetProps } from 'admin/core';

export interface TenantListContextProps {
    /* states */
    isInBreakPoint: boolean;
    /* props */
    textSearchProps: FieldSetProps;
    startDateSearchProps: FieldSetProps;
    endDateSearchProps: FieldSetProps;
    stateSearchProps: FieldSetProps;
}
