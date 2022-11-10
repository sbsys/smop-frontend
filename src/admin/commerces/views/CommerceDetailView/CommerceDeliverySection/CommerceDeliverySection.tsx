/* react */
import { memo } from 'react';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
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

    const { translate } = useAdminLang();

    return (
        <section className={SectionStyles.Section}>
            <div className={SectionStyles.Title}>
                <h2 title={translate('commercedetail.deliveries')}>
                    <Legend hasDots>{translate('commercedetail.deliveries')}</Legend>
                </h2>

                <Button
                    className={ButtonStyles.OutlineNone}
                    onClick={showUpdateDelivery}
                    title={translate('actions.edit')}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            <div className={styles.Delivery}>
                <div className={styles.ThirdPartyDelivery}>
                    <Legend className={styles.Title} hasDots>
                        {translate('commercedetail.third')}
                    </Legend>

                    <i className={commerce?.thirdPartyDelivery ? styles.Active : styles.Inactive}>
                        {commerce?.thirdPartyDelivery ? <MdCheckCircle /> : <IoMdCloseCircle />}
                    </i>
                </div>

                {commerce?.thirdPartyDelivery && (
                    <Legend hasDots title={translate('commercedetail.thirdsite')}>
                        <span className={styles.Title}>{translate('commercedetail.thirdsite')}: </span>

                        <a href={commerce.externalDeliveryUrl} target="__blank">
                            {commerce.externalDeliveryUrl}
                        </a>
                    </Legend>
                )}

                <Legend hasDots title={translate('commercedetail.mindelivery')}>
                    <span className={styles.Title}>{translate('commercedetail.mindelivery')}: </span>

                    <span>{commerce?.minAmountDelivery} $</span>
                </Legend>

                <Legend hasDots title={translate('commercedetail.deliveryarea')}>
                    <span className={styles.Title}>{translate('commercedetail.deliveryarea')}: </span>

                    <span>
                        {commerce?.deliveryArea} <span>{translate('longitude.miles')}</span>
                    </span>
                </Legend>

                {/* {commerce?.deliveringZone} */}
            </div>
        </section>
    );
};

export default memo(CommerceDeliverySection);
