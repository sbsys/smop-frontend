/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useProductDetailContext } from '../ProductDetail.context';
/* custom hook */
import { useUpdateCollection } from './useUpdateCollection.hook';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateCollection.module.scss';

const UpdateCollectionModal = () => {
    const {
        /* states */
        isUpdateCollection,
    } = useProductDetailContext();

    const { handleUpdateCollection, handleResetUpdateCollection, updateCollectionFields } = useUpdateCollection();

    const { t } = useTranslation();

    return (
        <ModalLayout isVisible={isUpdateCollection} rowAlignment="center" colAlignment="center" hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateCollection}>
                <form onSubmit={handleUpdateCollection}>
                    <div className={styles.Header} title={t('views.productdetail.updatecollection.title')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{t('views.productdetail.updatecollection.title')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        {updateCollectionFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={t('views.productdetail.updatecollection.actions.cancel')}
                            onClick={handleResetUpdateCollection}>
                            <Legend hasDots justify="center">
                                {t('views.productdetail.updatecollection.actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="submit"
                            className={ButtonStyles.FillSecondary}
                            title={t('views.productdetail.updatecollection.actions.update')}>
                            <Legend hasDots justify="center">
                                {t('views.productdetail.updatecollection.actions.update')}
                            </Legend>
                        </Button>
                    </div>
                </form>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateCollectionModal);
