/* react */
import { memo } from 'react';
/* custom hook */
import { useUpdateProductState } from './useUpdateProductState.hook';
/* context */
import { useProductListContext } from '../ProductList.context';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
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

    const { translate } = useAdminLang();

    return (
        <ModalLayout
            isVisible={selectedProductToUpdateState !== null}
            rowAlignment="center"
            colAlignment="center"
            hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateState}>
                <section>
                    <div className={styles.Header} title={translate('productlist.updatestatus')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{translate('productlist.updatestatus')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        <Legend justify="center">{selectedProductToUpdateState?.defaultReference}</Legend>

                        <Legend justify="center">
                            {translate(
                                `messages.${
                                    selectedProductToUpdateState?.isActive === 'active' ? 'deactivate' : 'activate'
                                }`
                            )}
                        </Legend>
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={translate('actions.cancel')}
                            onClick={handleCancelUpdateProductState}>
                            <Legend hasDots justify="center">
                                {translate('actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="button"
                            className={
                                selectedProductToUpdateState?.isActive === 'active'
                                    ? ButtonStyles.FillDanger
                                    : ButtonStyles.FillSuccess
                            }
                            title={translate(
                                selectedProductToUpdateState?.isActive === 'active'
                                    ? 'actions.deactivate'
                                    : 'actions.activate'
                            )}
                            onClick={handleUpdateProductState}>
                            <Legend hasDots justify="center">
                                {translate(
                                    selectedProductToUpdateState?.isActive === 'active'
                                        ? 'actions.deactivate'
                                        : 'actions.activate'
                                )}
                            </Legend>
                        </Button>
                    </div>
                </section>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateProductStateModal);
