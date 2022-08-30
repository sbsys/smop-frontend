/* props */
import { FieldSetProps } from 'admin/core';

export interface TenantListContextProps {
    /* states */
    isDropFilter: boolean;
    showDropFilter: () => void;
    hideDropFilter: () => void;
    isInBreakPoint: boolean;
    /* props */
    textSearchProps: FieldSetProps;
    startDateSearchProps: FieldSetProps;
    endDateSearchProps: FieldSetProps;
    stateSearchProps: FieldSetProps;
}
