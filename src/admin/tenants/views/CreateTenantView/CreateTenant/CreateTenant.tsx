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
        /* functions */
        handleCreateTenant,
        handleCalcelCreateTenant,
        /* props */
        createTenantFieldProps,
    } = useCreateTenantContext();

    return (
        <ScrollLayout classNameContent={styles.CreateTenant} orientation="col">
            <form onSubmit={handleCreateTenant}>
                <legend>
                    <Legend hasDots>Create new tenant</Legend>
                </legend>

                {createTenantFieldProps.map((field, index) => (
                    <FieldSet {...field} key={index} />
                ))}

                <div>
                    <Button type="button" className={ButtonStyles.OutlineNone} onClick={handleCalcelCreateTenant}>
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
