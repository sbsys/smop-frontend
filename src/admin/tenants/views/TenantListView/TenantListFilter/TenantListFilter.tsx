/* react */
import { memo } from 'react';
/* context */
import { useTenantListContext } from '../TenantList.context';
/* layouts */
import { FieldSet, useAdminLang } from 'admin/core';
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
    } = useTenantListContext();

    const { translate } = useAdminLang();

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
                <Button type="reset" className={ButtonStyles.OutlineNone} title={translate('actions.clean')}>
                    <Legend hasDots justify="center">
                        {translate('actions.clean')}
                    </Legend>
                </Button>

                <Button type="submit" className={ButtonStyles.FillSecondary} title={translate('actions.filter')}>
                    <Legend hasDots justify="center">
                        {translate('actions.filter')}
                    </Legend>
                </Button>
            </div>
        </form>
    );
};

export default memo(TenantListFilter);
