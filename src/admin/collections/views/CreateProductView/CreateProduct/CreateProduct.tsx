/* react */
import { memo } from 'react';
/* context */
import { useCreateProductContext } from '../CreateProduct.context';
/* layouts */
import { ScrollLayout, TabsLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { CreateProductReference } from '../CreateProductReference';
import { CreateProductCollection } from '../CreateProductCollection';
/* hooks */
import { useAdminLang } from 'admin/core';
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

    const { translate } = useAdminLang();

    return (
        <ScrollLayout orientation="col" classNameContent={styles.CreateProduct}>
            <div className={styles.Header}>
                <h1 title={translate('createproduct.title')}>
                    <Legend hasDots>{translate('createproduct.title')}</Legend>
                </h1>

                <Button
                    type="button"
                    className={ButtonStyles.OutlineNone}
                    title={translate('actions.cancel')}
                    onClick={handleCancelCreateProduct}>
                    <Legend hasDots justify="center">
                        {translate('actions.cancel')}
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
                                        1 - <>{translate('createproduct.general')}</>
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
                                        2 - <>{translate('createproduct.collection')}</>
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
