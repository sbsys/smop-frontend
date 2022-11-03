/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* custom hook */
import { useUpdateProductState } from './useUpdateProductState.hook';
/* context */
import { useProductListContext } from '../ProductList.context';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateProductState.module.scss';

const UpdateProductStateModal = () => {
    const {
        /* states */
        selectedProductToUpdateState,
    } = useProductListContext();

    const { handleCancelUpdateProductState, handleUpdateProductState } = useUpdateProductState();

    const { t } = useTranslation();

    return (
        <ModalLayout
            isVisible={selectedProductToUpdateState !== null}
            rowAlignment="center"
            colAlignment="center"
            hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateState}>
                <section>
                    <div className={styles.Header} title={t('views.productlist.updatestate.title')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{t('views.productlist.updatestate.title')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        <Legend justify="center">{selectedProductToUpdateState?.defaultReference}</Legend>

                        <Legend justify="center">
                            {t(
                                `views.productlist.updatestate.${
                                    selectedProductToUpdateState?.isActive === 'active' ? 'deactivate' : 'activate'
                                }`
                            )}
                        </Legend>
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={t('views.productlist.updatestate.actions.cancel')}
                            onClick={handleCancelUpdateProductState}>
                            <Legend hasDots justify="center">
                                {t('views.productlist.updatestate.actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="button"
                            className={
                                selectedProductToUpdateState?.isActive === 'active'
                                    ? ButtonStyles.FillDanger
                                    : ButtonStyles.FillSuccess
                            }
                            title={t('views.productlist.updatestate.actions.update')}
                            onClick={handleUpdateProductState}>
                            <Legend hasDots justify="center">
                                {t('views.productlist.updatestate.actions.update')}
                            </Legend>
                        </Button>
                    </div>
                </section>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateProductStateModal);
