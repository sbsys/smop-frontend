/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useProductListContext } from '../ProductList.context';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './ProductList.module.scss';

const ProductListFilter = () => {
    const {
        /* functions */
        /* handleFilter,
        handleResetFilter, */
        /* props */
        /* filterFormFields, */
    } = useProductListContext();

    const { t } = useTranslation();

    return (
        <form
            className={styles.Filter}
            onSubmit={/* handleFilter */ event => event.preventDefault()}
            onReset={/* handleResetFilter */ () => {}}>
            <div className={styles.Fields}>
                {[].map((_, index) => (
                    <FieldSet {...{ field: {} }} key={index} />
                ))}
            </div>

            <div className={styles.Actions}>
                <Button
                    type="reset"
                    className={ButtonStyles.OutlineNone}
                    title={t('views.productlist.filter.actions.clean')}>
                    <Legend hasDots justify="center">
                        {t('views.productlist.filter.actions.clean')}
                    </Legend>
                </Button>

                <Button
                    type="submit"
                    className={ButtonStyles.FillSecondary}
                    title={t('views.productlist.filter.actions.filter')}>
                    <Legend hasDots justify="center">
                        {t('views.productlist.filter.actions.filter')}
                    </Legend>
                </Button>
            </div>
        </form>
    );
};

export default memo(ProductListFilter);
