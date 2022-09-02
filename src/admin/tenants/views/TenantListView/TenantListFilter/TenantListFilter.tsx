/* react */
import { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { TenantListContext } from '../TenantList.context';
/* layouts */
import { FieldSet } from 'admin/core';
/* components */
import { Button, Legend } from 'shared/components';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './TenantListFilter.module.scss';

const TenantListFilter = () => {
    const {
        /* functions */
        handleFilter,
        handleResetFilter,
        /* props */
        textSearchProps,
        startDateSearchProps,
        endDateSearchProps,
        stateSearchProps,
    } = useContext(TenantListContext);

    const { t } = useTranslation();

    return (
        <form className={styles.Filter} onSubmit={handleFilter} onReset={handleResetFilter}>
            <div>
                <FieldSet {...textSearchProps} />

                <FieldSet {...stateSearchProps} />
            </div>

            <div>
                <FieldSet {...startDateSearchProps} />

                <FieldSet {...endDateSearchProps} />
            </div>

            <div>
                <Button
                    type="reset"
                    className={ButtonStyles.OutlineNone}
                    title={t('views.tenants.filter.actions.clean')}>
                    <Legend hasDots justify="center">
                        {t('views.tenants.filter.actions.clean')}
                    </Legend>
                </Button>

                <Button
                    type="submit"
                    className={ButtonStyles.FillSecondary}
                    title={t('views.tenants.filter.actions.filter')}>
                    <Legend hasDots justify="center">
                        {t('views.tenants.filter.actions.filter')}
                    </Legend>
                </Button>
            </div>
        </form>
    );
};

export default memo(TenantListFilter);
