/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* components */
import { Button, Legend } from 'shared/components';
/* assets */
import { MdCheckCircle, MdEdit } from 'react-icons/md';
import { IoMdCloseCircle } from 'react-icons/io';
/* styles */
import { ButtonStyles } from 'shared/styles';
import SectionStyles from '../CommerceDetail.module.scss';
import styles from './CommerceDeliverySection.module.scss';

const CommerceDeliverySection = () => {
    const {
        /* states */
        commerce,
        showUpdateDelivery,
    } = useCommerceDetailContext();

    const { t } = useTranslation();

    return (
        <section className={SectionStyles.Section}>
            <div className={SectionStyles.Title}>
                <h2 title={t('views.commercedetail.deliverysection.title')}>
                    <Legend hasDots>{t('views.commercedetail.deliverysection.title')}</Legend>
                </h2>

                <Button
                    className={ButtonStyles.OutlineNone}
                    onClick={showUpdateDelivery}
                    title={t('views.commercedetail.deliverysection.edit')}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            <div className={styles.Delivery}>
                <div className={styles.ThirdPartyDelivery}>
                    <Legend className={styles.Title} hasDots>
                        {t('views.commercedetail.deliverysection.thirdpartydelivery.title')}
                    </Legend>

                    <i className={commerce?.thirdPartyDelivery ? styles.Active : styles.Inactive}>
                        {commerce?.thirdPartyDelivery ? <MdCheckCircle /> : <IoMdCloseCircle />}
                    </i>
                </div>

                {commerce?.thirdPartyDelivery && (
                    <Legend hasDots title={t('views.commercedetail.deliverysection.thirdpartydelivery.site')}>
                        <span className={styles.Title}>
                            {t('views.commercedetail.deliverysection.thirdpartydelivery.site')}:{' '}
                        </span>

                        <a href={commerce.externalDeliveryUrl} target="__blank">
                            {commerce.externalDeliveryUrl}
                        </a>
                    </Legend>
                )}

                <Legend hasDots title={t('views.commercedetail.deliverysection.minamountdelivery')}>
                    <span className={styles.Title}>
                        {t('views.commercedetail.deliverysection.minamountdelivery')}:{' '}
                    </span>

                    <span>{commerce?.minAmountDelivery} $</span>
                </Legend>

                <Legend hasDots title={t('views.commercedetail.deliverysection.deliveryarea')}>
                    <span className={styles.Title}>{t('views.commercedetail.deliverysection.deliveryarea')}: </span>

                    <span>
                        {commerce?.deliveryArea} <span>{t('longitude.miles')}</span>
                    </span>
                </Legend>

                {/* {commerce?.deliveringZone} */}
            </div>
        </section>
    );
};

export default memo(CommerceDeliverySection);
