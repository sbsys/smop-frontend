/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* custom hook */
import { useUpdateCommerceState } from './useUpdateCommerceState.hook';
/* context */
import { useCommerceListContext } from '../CommerceList.context';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateCommerceState.module.scss';

const UpdateCommerceStateModal = () => {
    const {
        /* states */
        selectedCommerceToUpdateState,
    } = useCommerceListContext();

    const { handleCancelUpdateCommerceState, handleUpdateCommerceState } = useUpdateCommerceState();

    const { t } = useTranslation();

    return (
        <ModalLayout
            isVisible={selectedCommerceToUpdateState !== null}
            rowAlignment="center"
            colAlignment="center"
            hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateState}>
                <section>
                    <div className={styles.Header} title={t('views.commercelist.updatestate.title')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{t('views.commercelist.updatestate.title')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        <Legend justify="center">{selectedCommerceToUpdateState?.name}</Legend>

                        <Legend justify="center">
                            {t(
                                `views.commercelist.updatestate.${
                                    selectedCommerceToUpdateState?.isActive === 'active' ? 'deactivate' : 'activate'
                                }`
                            )}
                        </Legend>
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={t('views.commercelist.updatestate.actions.cancel')}
                            onClick={handleCancelUpdateCommerceState}>
                            <Legend hasDots justify="center">
                                {t('views.commercelist.updatestate.actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="button"
                            className={
                                selectedCommerceToUpdateState?.isActive === 'active'
                                    ? ButtonStyles.FillDanger
                                    : ButtonStyles.FillSuccess
                            }
                            title={t('views.commercelist.updatestate.actions.update')}
                            onClick={handleUpdateCommerceState}>
                            <Legend hasDots justify="center">
                                {t('views.commercelist.updatestate.actions.update')}
                            </Legend>
                        </Button>
                    </div>
                </section>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateCommerceStateModal);
