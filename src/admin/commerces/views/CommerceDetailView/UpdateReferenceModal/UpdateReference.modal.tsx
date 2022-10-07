/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* custom hook */
import { useUpdateReference } from './useUpdateReference.hook';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import styles from './UpdateReference.module.scss';

const UpdateReferenceModal = () => {
    const {
        /* states */
        isUpdateReference,
    } = useCommerceDetailContext();

    const { handleUpdateReference, handleResetUpdateReferenceForm } = useUpdateReference();

    const { t } = useTranslation();

    return (
        <ModalLayout isVisible={isUpdateReference} rowAlignment="center" colAlignment="center" hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateReference}>
                <form onSubmit={event => event.preventDefault()}>
                    <div className={styles.Header} title={t('views.commercedetail.updatereference.title')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{t('views.commercedetail.updatereference.title')}</Legend>
                    </div>
                </form>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateReferenceModal);
