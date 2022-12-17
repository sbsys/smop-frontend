/* react */
import { memo } from 'react';
/* custom hook */
import { useUpdateAttention } from './useUpdateAttention.hook';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* layouts */
import { ModalLayout, PanelLayout, ScrollLayout, TabProps, TabsLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { AdminLang, FieldSet, useAdminLang } from 'admin/core';
/* utils */
import { classNames } from 'shared/utils';
/* types */
import { Attention } from 'admin/commerces/types';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateAttention.module.scss';

const UpdateAttentionModal = () => {
    const {
        /* states */
        isUpdateAttention,
        hideUpdateAttention,
    } = useCommerceDetailContext();

    const {
        handleUpdateAttention,
        handleResetUpdateAttentionForm,
        handleRepeatSunday,
        updateAttentionServiceHoursStrategy,
        updateAttentionPreparationTimeStrategy,
    } = useUpdateAttention();

    const { translate } = useAdminLang();

    return (
        <ModalLayout isVisible={isUpdateAttention} rowAlignment="center" colAlignment="center" hasIndentation>
            <PanelLayout orientation="col" className={styles.UpdateAttention}>
                <form onSubmit={handleUpdateAttention}>
                    <div className={styles.Header} title={translate('commerceedit.attention')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{translate('commerceedit.attention')}</Legend>
                    </div>

                    <TabsLayout
                        className={styles.Tab}
                        classNameHeader={styles.TabHeader}
                        tabs={[
                            ...Object.keys(updateAttentionServiceHoursStrategy).map(key => ({
                                header: ({ isCurrentTab, setCurrentTab }: TabProps) => (
                                    <Button
                                        type="button"
                                        className={classNames(
                                            styles.TabHeaderItem,
                                            isCurrentTab && styles.TabHeaderItemActive
                                        )}
                                        onClick={() => setCurrentTab()}
                                        title={translate(`commerceedit.${key}` as AdminLang)}>
                                        <Legend justify="center">
                                            {translate(`commerceedit.${key}` as AdminLang)}
                                        </Legend>
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
                                                {updateAttentionServiceHoursStrategy[key as Attention].map(field => (
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
                                        className={classNames(
                                            styles.TabHeaderItem,
                                            isCurrentTab && styles.TabHeaderItemActive
                                        )}
                                        onClick={() => setCurrentTab()}
                                        title={translate('commerceedit.preparation' as AdminLang)}>
                                        <Legend justify="center">
                                            {translate('commerceedit.preparation' as AdminLang)}
                                        </Legend>
                                    </Button>
                                ),
                                body: (
                                    <PanelLayout orientation="col" className={styles.Content}>
                                        <ScrollLayout orientation="col">
                                            <div className={styles.ServiceHours}>
                                                {Object.keys(updateAttentionPreparationTimeStrategy).map(key =>
                                                    updateAttentionPreparationTimeStrategy[key as Attention].map(
                                                        (field, index) => (
                                                            <FieldSet {...field} key={`${key}_${index}`} />
                                                        )
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
                            title={translate('actions.cancel')}
                            onClick={() => {
                                handleResetUpdateAttentionForm();

                                hideUpdateAttention();
                            }}>
                            <Legend hasDots justify="center">
                                {translate('actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="submit"
                            className={ButtonStyles.FillSecondary}
                            title={translate('actions.update')}>
                            <Legend hasDots justify="center">
                                {translate('actions.update')}
                            </Legend>
                        </Button>
                    </div>
                </form>
            </PanelLayout>
        </ModalLayout>
    );
};

export default memo(UpdateAttentionModal);
