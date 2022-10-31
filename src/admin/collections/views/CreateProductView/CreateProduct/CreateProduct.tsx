/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useCreateProductContext } from '../CreateProduct.context';
/* layouts */
import { ScrollLayout, TabsLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { CreateProductReference } from '../CreateProductReference';
import { CreateProductCollection } from '../CreateProductCollection';
/* utils */
import { classNames } from 'shared/utils';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './CreateProduct.module.scss';

const CreateProduct = () => {
    const {
        /* states */
        tabRef,
        /* functions */
        handleCreateProductSubmit,
        handleCancelCreateProduct,
    } = useCreateProductContext();

    const { t } = useTranslation();

    return (
        <ScrollLayout orientation="col" classNameContent={styles.CreateProduct}>
            <div className={styles.Header}>
                <h1 title={t('views.createproduct.header')}>
                    <Legend hasDots>{t('views.createproduct.header')}</Legend>
                </h1>

                <Button
                    type="button"
                    className={ButtonStyles.OutlineNone}
                    title={t('views.createproduct.actions.cancel')}
                    onClick={handleCancelCreateProduct}>
                    <Legend hasDots justify="center">
                        {t('views.createproduct.actions.cancel')}
                    </Legend>
                </Button>
            </div>

            <form onSubmit={handleCreateProductSubmit} className={styles.Form}>
                <TabsLayout
                    className={styles.Tab}
                    classNameHeader={styles.TabHeader}
                    ref={tabRef}
                    tabs={[
                        {
                            header: ({ isCurrentTab }) => (
                                <Button
                                    className={classNames(styles.TabItem, isCurrentTab && styles.TabItemActive)}
                                    type="button">
                                    <Legend hasDots justify="center">
                                        1 - <>{t('views.createproduct.reference.header')}</>
                                    </Legend>
                                </Button>
                            ),
                            body: <CreateProductReference />,
                        },
                        {
                            header: ({ isCurrentTab }) => (
                                <Button
                                    className={classNames(styles.TabItem, isCurrentTab && styles.TabItemActive)}
                                    type="button">
                                    <Legend hasDots justify="center">
                                        2 - <>{t('views.createproduct.collection.header')}</>
                                    </Legend>
                                </Button>
                            ),
                            body: <CreateProductCollection />,
                        },
                    ]}
                />
            </form>
        </ScrollLayout>
    );
};

export default memo(CreateProduct);
