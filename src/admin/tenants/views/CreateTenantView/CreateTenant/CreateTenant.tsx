/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
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

    const { t } = useTranslation();

    return (
        <ScrollLayout classNameContent={styles.CreateTenant} orientation="col">
            <form onSubmit={handleCreateTenant}>
                <legend title={t('views.createtenant.form.title')}>
                    <Legend hasDots>{t('views.createtenant.form.title')}</Legend>
                </legend>

                {createTenantFieldProps.map((field, index) => (
                    <FieldSet {...field} key={index} />
                ))}

                <div>
                    <Button
                        type="button"
                        title={t('views.createtenant.form.actions.cancel')}
                        className={ButtonStyles.OutlineNone}
                        onClick={handleCalcelCreateTenant}>
                        <Legend hasDots justify="center">
                            {t('views.createtenant.form.actions.cancel')}
                        </Legend>
                    </Button>

                    <Button
                        type="submit"
                        title={t('views.createtenant.form.actions.create')}
                        className={ButtonStyles.FillSecondary}>
                        <Legend hasDots justify="center">
                            {t('views.createtenant.form.actions.create')}
                        </Legend>
                    </Button>
                </div>
            </form>
        </ScrollLayout>
    );
};

export default memo(CreateTenant);
