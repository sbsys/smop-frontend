/* react */
import { memo } from 'react';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
/* utils */
import { amountFormat, classNames } from 'shared/utils';
/* assets */
import { MdCheckCircle, MdEdit } from 'react-icons/md';
import { IoMdCloseCircle } from 'react-icons/io';
/* styles */
import { ButtonStyles } from 'shared/styles';
import SectionStyles from '../CommerceDetail.module.scss';
import styles from './CommerceSettingSection.module.scss';

const CommerceSettingSection = () => {
    const {
        /* states */
        commerce,
        showUpdateSetting,
    } = useCommerceDetailContext();

    const { translate } = useAdminLang();

    return (
        <section className={SectionStyles.Section}>
            <div className={SectionStyles.Title}>
                <h2 title={translate('commercedetail.settings')}>
                    <Legend hasDots>{translate('commercedetail.settings')}</Legend>
                </h2>

                <Button
                    className={ButtonStyles.OutlineNone}
                    onClick={showUpdateSetting}
                    title={translate('actions.edit')}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            <div className={styles.Setting}>
                <div className={styles.TypeOrder}>
                    <Legend hasDots>{translate(`commercedetail.online`)}</Legend>

                    <i className={commerce?.orderOnline ? styles.Active : styles.Inactive}>
                        {commerce?.orderOnline ? <MdCheckCircle /> : <IoMdCloseCircle />}
                    </i>
                </div>

                <Legend className={styles.Title} hasDots title={translate('commercedetail.orders')}>
                    {translate('commercedetail.orders')}
                </Legend>

                {commerce?.typeOrder.map((tOrder, index) => (
                    <div key={index} className={styles.TypeOrder}>
                        <i className={tOrder.enabled ? styles.Active : styles.Inactive}>
                            {tOrder.enabled ? <MdCheckCircle /> : <IoMdCloseCircle />}
                        </i>

                        <Legend hasDots>{translate(`ordertypes.${tOrder.type}`)}</Legend>
                    </div>
                ))}

                {commerce?.typeCharge.map((tCharge, index) => (
                    <div
                        key={index}
                        className={classNames(styles.TypeCharge, !tCharge.enabled && styles.TypeChargeDisabled)}>
                        <Legend hasDots title={translate('commercedetail.typecharge')}>
                            <span className={styles.Title}>{translate('commercedetail.typecharge')}: </span>

                            <span>({translate(`commercedetail.${tCharge.type}charge`)}) </span>

                            <span>
                                {amountFormat(tCharge.value, 2)} {tCharge.symbol}
                            </span>
                        </Legend>
                    </div>
                ))}

                <Legend hasDots title={translate('commercedetail.applycharge')}>
                    <span className={styles.Title}>{translate('commercedetail.applycharge')}: </span>

                    <span>{translate(`applycharge.${commerce?.applyCharge as 0 | 1}`)}</span>
                </Legend>

                <div className={styles.TypeOrder}>
                    <Legend className={styles.Title} hasDots>
                        {translate('commercedetail.sms')}
                    </Legend>

                    <i className={commerce?.smsAlerts ? styles.Active : styles.Inactive}>
                        {commerce?.smsAlerts ? <MdCheckCircle /> : <IoMdCloseCircle />}
                    </i>
                </div>
            </div>
        </section>
    );
};

export default memo(CommerceSettingSection);
