/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useProductDetailContext } from '../ProductDetail.context';
/* custom hook */
import { useUpdateGeneral } from './useUpdateGeneral.hook';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateGeneral.module.scss';

const UpdateGeneralModal = () => {
    const {
        /* states */
        isUpdateGeneral,
    } = useProductDetailContext();

    const { handleUpdateGeneral, handleResetUpdateGeneral, updateGeneralFields } = useUpdateGeneral();

    const { t } = useTranslation();

    return (
        <ModalLayout isVisible={isUpdateGeneral} rowAlignment="center" colAlignment="center" hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateGeneral}>
                <form onSubmit={handleUpdateGeneral}>
                    <div className={styles.Header} title={t('views.productdetail.updategeneral.title')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{t('views.productdetail.updategeneral.title')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        {updateGeneralFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={t('views.productdetail.updategeneral.actions.cancel')}
                            onClick={handleResetUpdateGeneral}>
                            <Legend hasDots justify="center">
                                {t('views.productdetail.updategeneral.actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="submit"
                            className={ButtonStyles.FillSecondary}
                            title={t('views.productdetail.updategeneral.actions.update')}>
                            <Legend hasDots justify="center">
                                {t('views.productdetail.updategeneral.actions.update')}
                            </Legend>
                        </Button>
                    </div>
                </form>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateGeneralModal);
