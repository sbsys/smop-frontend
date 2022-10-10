/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useCreateCommerceContext } from '../CreateCommerce.context';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { CreateCommerceReference } from '../CreateCommerceReference';
import { CreateCommerceSetting } from '../CreateCommerceSetting';
import { CreateCommerceAttention } from '../CreateCommerceAttention';
/* styles */
import styles from './CreateCommerce.module.scss';
import { ButtonStyles } from 'shared/styles';

const CreateCommerce = () => {
    const {
        /* functions */
        handleCreateCommerceSubmit,
        handleCancelCreateCommerce,
    } = useCreateCommerceContext();

    const { t } = useTranslation();

    return (
        <ScrollLayout orientation="col" classNameContent={styles.CreateCommerce}>
            <h1 title={t('views.createcommerce.header')}>
                <Legend hasDots>{t('views.createcommerce.header')}</Legend>
            </h1>

            <form onSubmit={handleCreateCommerceSubmit} className={styles.Form}>
                <div className={styles.Content}>
                    <CreateCommerceReference />
                    <CreateCommerceSetting />
                    <CreateCommerceAttention /> CreateCommerceDelivery
                </div>

                <div className={styles.Actions}>
                    <Button
                        type="button"
                        className={ButtonStyles.OutlineNone}
                        title={t('views.createcommerce.actions.cancel')}
                        onClick={handleCancelCreateCommerce}>
                        <Legend hasDots justify="center">
                            {t('views.createcommerce.actions.cancel')}
                        </Legend>
                    </Button>

                    <Button
                        type="submit"
                        className={ButtonStyles.FillSecondary}
                        title={t('views.createcommerce.actions.update')}>
                        <Legend hasDots justify="center">
                            {t('views.createcommerce.actions.update')}
                        </Legend>
                    </Button>
                </div>
            </form>
        </ScrollLayout>
    );
};

export default memo(CreateCommerce);
