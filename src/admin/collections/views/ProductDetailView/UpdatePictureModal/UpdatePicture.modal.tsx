/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useProductDetailContext } from '../ProductDetail.context';
/* custom hook */
import { useUpdatePicture } from './useUpdatePicture.hook';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdatePicture.module.scss';

const UpdatePictureModal = () => {
    const {
        /* states */
        isUpdatePicture,
    } = useProductDetailContext();

    const { handleUpdatePicture, handleResetUpdatePicture, updatePictureFields } = useUpdatePicture();

    const { t } = useTranslation();

    return (
        <ModalLayout isVisible={isUpdatePicture} rowAlignment="center" colAlignment="center" hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdatePicture}>
                <form onSubmit={handleUpdatePicture}>
                    <div className={styles.Header} title={t('views.productdetail.updatepicture.title')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{t('views.productdetail.updatepicture.title')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        {updatePictureFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={t('views.productdetail.updatepicture.actions.cancel')}
                            onClick={handleResetUpdatePicture}>
                            <Legend hasDots justify="center">
                                {t('views.productdetail.updatepicture.actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="submit"
                            className={ButtonStyles.FillSecondary}
                            title={t('views.productdetail.updatepicture.actions.update')}>
                            <Legend hasDots justify="center">
                                {t('views.productdetail.updatepicture.actions.update')}
                            </Legend>
                        </Button>
                    </div>
                </form>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdatePictureModal);
