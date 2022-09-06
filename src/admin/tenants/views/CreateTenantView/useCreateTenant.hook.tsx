/* props */
import { FieldSetProps } from 'admin/core';
import { CreateTenantContextProps } from './CreateTenant.props';
/* styles */
import { FieldStyles } from 'shared/styles';

export const useCreateTenant = () => {
    /* props */
    const schemaProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: "Schema's name",
        },
        isHintReserved: true,
    };

    const emailProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'email',
            placeholder: "Administrator's email",
        },
        isHintReserved: true,
    };

    const passwordProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'password',
            placeholder: "Administrator's password",
        },
        isHintReserved: true,
    };

    const repeatPasswordProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'password',
            placeholder: 'Repeat password',
        },
        isHintReserved: true,
    };

    /* context */
    const context: CreateTenantContextProps = {
        /* props */
        schemaProps,
        emailProps,
        passwordProps,
        repeatPasswordProps,
    };

    return { context };
};
