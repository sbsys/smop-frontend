/* props */
import { FieldSetProps } from 'admin/core';
/* types */
import { TenantItemDTO } from 'admin/tenants/types';

export interface TenantListContextProps {
    /* states */
    tenantList: TenantItemDTO[];
    isInBreakPoint: boolean;
    /* functions */
    handleFilter: () => void;
    handleResetFilter: () => void;
    /* props */
    textSearchProps: FieldSetProps;
    startDateSearchProps: FieldSetProps;
    endDateSearchProps: FieldSetProps;
    stateSearchProps: FieldSetProps;
}

export type TitleSubtitle = {
    title: string;
    subtitle: string;
};
