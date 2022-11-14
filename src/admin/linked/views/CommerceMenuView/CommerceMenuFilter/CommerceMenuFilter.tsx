/* react */
import { memo } from 'react';
/* context */
import { useCommerceMenuContext } from '../CommerceMenu.context';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet, useAdminLang } from 'admin/core';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './CommerceMenuFilter.module.scss';

const CommerceMenuFilter = () => {
    const {
        /* functions */
        handleFilter,
        handleResetFilter,
        /* props */
        filterFormFields,
    } = useCommerceMenuContext();

    const { translate } = useAdminLang();

    return (
        <form className={styles.Filter} onSubmit={handleFilter} onReset={handleResetFilter}>
            <div className={styles.Fields}>
                {filterFormFields.map((field, index) => (
                    <FieldSet {...field} key={index} />
                ))}
            </div>

            <div className={styles.Actions}>
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

export default memo(CommerceMenuFilter);
