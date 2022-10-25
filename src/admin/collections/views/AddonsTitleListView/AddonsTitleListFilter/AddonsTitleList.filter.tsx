/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useAddonsTitleListContext } from '../AddonsTitleList.context';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './AddonsTitleList.module.scss';

const AddonsTitleListFilter = () => {
    const {
        /* functions */
        handleFilter,
        handleResetFilter,
        /* props */
        filterFormFields,
    } = useAddonsTitleListContext();

    const { t } = useTranslation();

    return (
        <form className={styles.Filter} onSubmit={handleFilter} onReset={handleResetFilter}>
            <div className={styles.Fields}>
                {filterFormFields.map((field, index) => (
                    <FieldSet {...field} key={index} />
                ))}
            </div>

            <div className={styles.Actions}>
                <Button
                    type="reset"
                    className={ButtonStyles.OutlineNone}
                    title={t('views.maintitlelist.filter.actions.clean')}>
                    <Legend hasDots justify="center">
                        {t('views.maintitlelist.filter.actions.clean')}
                    </Legend>
                </Button>

                <Button
                    type="submit"
                    className={ButtonStyles.FillSecondary}
                    title={t('views.maintitlelist.filter.actions.filter')}>
                    <Legend hasDots justify="center">
                        {t('views.maintitlelist.filter.actions.filter')}
                    </Legend>
                </Button>
            </div>
        </form>
    );
};

export default memo(AddonsTitleListFilter);
