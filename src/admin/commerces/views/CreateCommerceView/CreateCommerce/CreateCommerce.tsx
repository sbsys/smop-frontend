/* react */
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useCreateCommerceContext } from '../CreateCommerce.context';
/* layouts */
import { ScrollLayout, TabsLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { CreateCommerceReference } from '../CreateCommerceReference';
import { CreateCommerceSetting } from '../CreateCommerceSetting';
import { CreateCommerceAttention } from '../CreateCommerceAttention';
import { CreateCommerceDelivery } from '../CreateCommerceDelivery';
/* utils */
import { classNames } from 'shared/utils';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './CreateCommerce.module.scss';

const CreateCommerce = () => {
    const {
        /* states */
        tabRef,
        /* functions */
        handleCreateCommerceSubmit,
        handleCancelCreateCommerce,
        handlePrevTab,
        handleNextTab,
    } = useCreateCommerceContext();

    const handleToPrevTab = useCallback(() => handlePrevTab(), [handlePrevTab]);
    const handleToNextTab = useCallback(() => handleNextTab(), [handleNextTab]);

    const { t } = useTranslation();

    return (
        <ScrollLayout orientation="col" classNameContent={styles.CreateCommerce}>
            <div className={styles.Header}>
                <h1 title={t('views.createcommerce.header')}>
                    <Legend hasDots>{t('views.createcommerce.header')}</Legend>
                </h1>

                <Button
                    type="button"
                    className={ButtonStyles.OutlineNone}
                    title={t('views.createcommerce.actions.cancel')}
                    onClick={handleCancelCreateCommerce}>
                    <Legend hasDots justify="center">
                        {t('views.createcommerce.actions.cancel')}
                    </Legend>
                </Button>
            </div>

            <form onSubmit={handleCreateCommerceSubmit} className={styles.Form}>
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
                                    <Legend justify="center">
                                        1 - <>{t('views.createcommerce.reference.header')}</>
                                    </Legend>
                                </Button>
                            ),
                            body: <CreateCommerceReference />,
                        },
                        {
                            header: ({ isCurrentTab }) => (
                                <Button
                                    className={classNames(styles.TabItem, isCurrentTab && styles.TabItemActive)}
                                    type="button">
                                    <Legend justify="center">
                                        2 - <>{t('views.createcommerce.setting.header')}</>
                                    </Legend>
                                </Button>
                            ),
                            body: (
                                <ScrollLayout orientation="col">
                                    <div className={styles.Join}>
                                        <CreateCommerceSetting />

                                        <CreateCommerceDelivery />

                                        <div className={styles.JoinActions}>
                                            <Button
                                                type="button"
                                                className={ButtonStyles.OutlineNone}
                                                title={t('actions.prevstep')}
                                                onClick={handleToPrevTab}>
                                                <Legend hasDots justify="center">
                                                    {t('actions.prevstep')}
                                                </Legend>
                                            </Button>

                                            <Button
                                                type="button"
                                                className={ButtonStyles.FillSecondary}
                                                title={t('actions.nextstep')}
                                                onClick={handleToNextTab}>
                                                <Legend hasDots justify="center">
                                                    {t('actions.nextstep')}
                                                </Legend>
                                            </Button>
                                        </div>
                                    </div>
                                </ScrollLayout>
                            ),
                        },
                        {
                            header: ({ isCurrentTab }) => (
                                <Button
                                    className={classNames(styles.TabItem, isCurrentTab && styles.TabItemActive)}
                                    type="button">
                                    <Legend justify="center">
                                        3 - <>{t('views.createcommerce.attention.header')}</>
                                    </Legend>
                                </Button>
                            ),
                            body: <CreateCommerceAttention />,
                        },
                    ]}
                />
            </form>
        </ScrollLayout>
    );
};

export default memo(CreateCommerce);
