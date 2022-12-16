/* react */
import { memo } from 'react';
/* context */
import { useCreateCommerceContext } from '../CreateCommerce.context';
/* custom hook */
import { useCreateCommerceAttention } from './useCreateCommerceAttention.hook';
/* layouts */
import { PanelLayout, ScrollLayout, TabProps, TabsLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { AdminLang, FieldSet, useAdminLang } from 'admin/core';
/* utils */
import { classNames } from 'shared/utils';
/* types */
import { Attention } from 'admin/commerces/types';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './CreateCommerceAttention.module.scss';

const CreateCommerceAttention = () => {
    const {
        /* functions */
        handlePrevTab,
    } = useCreateCommerceContext();

    const { createCommerceServiceHoursStrategy, handleRepeatSunday, createCommercePreparationTimeStrategy } =
        useCreateCommerceAttention();

    const { translate } = useAdminLang();

    return (
        <PanelLayout orientation="col" className={styles.Attention}>
            <TabsLayout
                className={styles.Tab}
                classNameHeader={styles.TabHeader}
                tabs={[
                    ...Object.keys(createCommerceServiceHoursStrategy).map(key => ({
                        header: ({ isCurrentTab, setCurrentTab }: TabProps) => (
                            <Button
                                type="button"
                                className={classNames(styles.TabHeaderItem, isCurrentTab && styles.TabHeaderItemActive)}
                                onClick={() => setCurrentTab()}
                                title={translate(`createcommerce.${key}` as AdminLang)}>
                                <Legend justify="center">{translate(`createcommerce.${key}` as AdminLang)}</Legend>
                            </Button>
                        ),
                        body: (
                            <PanelLayout orientation="col" className={styles.Content}>
                                <Button
                                    type="button"
                                    className={ButtonStyles.FillSecondary}
                                    onClick={() => handleRepeatSunday(key as Attention)}>
                                    <Legend hasDots justify="center">
                                        {translate('actions.repeatweekday')}
                                    </Legend>
                                </Button>

                                <ScrollLayout orientation="col">
                                    <div className={styles.ServiceHours}>
                                        {createCommerceServiceHoursStrategy[key as Attention].map(field => (
                                            <FieldSet {...field} />
                                        ))}
                                    </div>
                                </ScrollLayout>
                            </PanelLayout>
                        ),
                    })),
                    {
                        header: ({ isCurrentTab, setCurrentTab }: TabProps) => (
                            <Button
                                type="button"
                                className={classNames(styles.TabHeaderItem, isCurrentTab && styles.TabHeaderItemActive)}
                                onClick={() => setCurrentTab()}
                                title={translate('createcommerce.preparation' as AdminLang)}>
                                <Legend justify="center">{translate('createcommerce.preparation' as AdminLang)}</Legend>
                            </Button>
                        ),
                        body: (
                            <PanelLayout orientation="col" className={styles.Content}>
                                <ScrollLayout orientation="col">
                                    <div className={styles.ServiceHours}>
                                        {Object.keys(createCommercePreparationTimeStrategy).map(key =>
                                            createCommercePreparationTimeStrategy[key as Attention].map(
                                                (field, index) => <FieldSet {...field} key={`${key}_${index}`} />
                                            )
                                        )}
                                    </div>
                                </ScrollLayout>
                            </PanelLayout>
                        ),
                    },
                ]}
            />

            <div className={styles.Actions}>
                <Button
                    type="button"
                    className={ButtonStyles.OutlineNone}
                    title={translate('actions.prevstep')}
                    onClick={handlePrevTab}>
                    <Legend hasDots justify="center">
                        {translate('actions.prevstep')}
                    </Legend>
                </Button>

                <Button type="submit" className={ButtonStyles.FillSecondary} title={translate('actions.save')}>
                    <Legend hasDots justify="center">
                        {translate('actions.save')}
                    </Legend>
                </Button>
            </div>
        </PanelLayout>
    );
};

export default memo(CreateCommerceAttention);
