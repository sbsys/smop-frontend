/* react */
import { memo, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
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
/* hooks */
import { useAdminLang } from 'admin/core';
/* utils */
import { classNames } from 'shared/utils';
/* props */
import { CreateCommerceForm } from '../CreateCommerce.props';
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

    const { trigger } = useFormContext<CreateCommerceForm>();

    const handleToPrevTab = useCallback(() => handlePrevTab(), [handlePrevTab]);
    const handleToNextTab = useCallback(async () => {
        if (await trigger(['typeCharge', 'applyCharge'])) handleNextTab();
    }, [handleNextTab, trigger]);

    const { translate } = useAdminLang();

    return (
        <ScrollLayout orientation="col" classNameContent={styles.CreateCommerce}>
            <div className={styles.Header}>
                <h1 title={translate('createcommerce.title')}>
                    <Legend hasDots>{translate('createcommerce.title')}</Legend>
                </h1>

                <Button
                    type="button"
                    className={ButtonStyles.OutlineNone}
                    title={translate('actions.cancel')}
                    onClick={handleCancelCreateCommerce}>
                    <Legend hasDots justify="center">
                        {translate('actions.cancel')}
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
                                        1 - <>{translate('createcommerce.references')}</>
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
                                        2 - <>{translate('createcommerce.settings')}</>
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
                                                title={translate('actions.prevstep')}
                                                onClick={handleToPrevTab}>
                                                <Legend hasDots justify="center">
                                                    {translate('actions.prevstep')}
                                                </Legend>
                                            </Button>

                                            <Button
                                                type="button"
                                                className={ButtonStyles.FillSecondary}
                                                title={translate('actions.nextstep')}
                                                onClick={handleToNextTab}>
                                                <Legend hasDots justify="center">
                                                    {translate('actions.nextstep')}
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
                                        3 - <>{translate('createcommerce.attention')}</>
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
