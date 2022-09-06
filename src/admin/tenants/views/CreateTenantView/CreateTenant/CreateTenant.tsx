/* react */
import { memo } from 'react';
/* context */
import { useCreateTenantContext } from '../CreateTenant.context';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './CreateTenant.module.scss';

const CreateTenant = () => {
    const {
        /* props */
        schemaProps,
        emailProps,
        passwordProps,
        repeatPasswordProps,
    } = useCreateTenantContext();

    return (
        <ScrollLayout classNameContent={styles.CreateTenant} orientation="col">
            <form onSubmit={event => event.preventDefault()}>
                <legend>
                    <Legend hasDots>Create new tenant</Legend>
                </legend>

                <FieldSet {...schemaProps} />

                <FieldSet {...emailProps} />

                <FieldSet {...passwordProps} />

                <FieldSet {...repeatPasswordProps} />

                <div>
                    <Button type="button" className={ButtonStyles.OutlineNone}>
                        <Legend hasDots justify="center">
                            Cancel
                        </Legend>
                    </Button>

                    <Button type="submit" className={ButtonStyles.FillSecondary}>
                        <Legend hasDots justify="center">
                            Create
                        </Legend>
                    </Button>
                </div>
            </form>
        </ScrollLayout>
    );
};

export default memo(CreateTenant);
