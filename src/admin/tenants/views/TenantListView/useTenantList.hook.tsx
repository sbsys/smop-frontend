/* props */
import { TenantListContextProps } from './TenantList.props';
import { FieldSetProps } from 'admin/core';
/* styles */
import { FieldStyles } from 'shared/styles';

export const useTenantList = () => {
    /* props */
    const textSearchProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: 'Schema',
        },
        isHintReserved: true,
        hint: {
            children: 'Search schema',
            hasDots: true,
            title: 'Search schema',
        },
    };

    const stateSearchProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'select',
            placeholder: 'Choose state',
            options: [
                {
                    label: 'Active',
                    value: 'active',
                },
                {
                    label: 'Inactive',
                    value: 'inactive',
                },
            ],
        },
        isHintReserved: true,
        hint: {
            children: 'Tenant state',
            hasDots: true,
            title: 'Tenant state',
        },
    };

    const startDateSearchProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'date',
            placeholder: 'Start date',
        },
        isHintReserved: true,
        hint: {
            children: 'Start date',
            hasDots: true,
            title: 'Start date',
        },
    };

    const endDateSearchProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'date',
            placeholder: 'End date',
        },
        isHintReserved: true,
        hint: {
            children: 'End date',
            hasDots: true,
            title: 'End date',
        },
    };

    /* context */
    const context: TenantListContextProps = {
        /* props */
        textSearchProps,
        stateSearchProps,
        startDateSearchProps,
        endDateSearchProps,
    };

    return { context };
};
