/* react */
import { memo } from 'react';
/* context */
import { useCreateTenantContext } from '../CreateTenant.context';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet, useAdminLang } from 'admin/core';
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

    const { translate } = useAdminLang();

    return (
        <ScrollLayout classNameContent={styles.CreateTenant} orientation="col">
            <form onSubmit={handleCreateTenant}>
                <legend title={translate('createorg.title')}>
                    <Legend hasDots>{translate('createorg.title')}</Legend>
                </legend>

                {createTenantFieldProps.map((field, index) => (
                    <FieldSet {...field} key={index} />
                ))}

                <div>
                    <Button
                        type="button"
                        title={translate('actions.cancel')}
                        className={ButtonStyles.OutlineNone}
                        onClick={handleCalcelCreateTenant}>
                        <Legend hasDots justify="center">
                            {translate('actions.cancel')}
                        </Legend>
                    </Button>

                    <Button type="submit" title={translate('actions.save')} className={ButtonStyles.FillSecondary}>
                        <Legend hasDots justify="center">
                            {translate('actions.save')}
                        </Legend>
                    </Button>
                </div>
            </form>
        </ScrollLayout>
    );
};

export default memo(CreateTenant);
