/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* components */
import { Button, Legend } from 'shared/components';
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
    } = useCommerceDetailContext();

    const { t } = useTranslation();

    return (
        <section className={SectionStyles.Section}>
            <div className={SectionStyles.Title}>
                <h2 title={t('views.commercedetail.settingsection.title')}>
                    <Legend hasDots>{t('views.commercedetail.settingsection.title')}</Legend>
                </h2>

                <Button className={ButtonStyles.OutlineNone} title={t('views.commercedetail.settingsection.edit')}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            <div className={styles.Setting}>
                {commerce?.orderOnline}
                <Legend
                    className={styles.Title}
                    hasDots
                    title={t('views.commercedetail.settingsection.typeorder.title')}>
                    {t('views.commercedetail.settingsection.typeorder.title')}
                </Legend>

                {commerce?.typeOrder.map((tOrder, index) => (
                    <div key={index} className={styles.TypeOrder}>
                        <i className={tOrder.enabled ? styles.Active : styles.Inactive}>
                            {tOrder.enabled ? <MdCheckCircle /> : <IoMdCloseCircle />}
                        </i>

                        <Legend hasDots>{t(`views.commercedetail.settingsection.typeorder.${tOrder.type}`)}</Legend>
                    </div>
                ))}

                <Legend
                    className={styles.Title}
                    hasDots
                    title={t('views.commercedetail.settingsection.typecharge.title')}>
                    {t('views.commercedetail.settingsection.typecharge.title')}
                </Legend>

                {commerce?.typeCharge.map((tCharge, index) => (
                    <div
                        key={index}
                        className={classNames(styles.TypeCharge, !tCharge.enabled && styles.TypeChargeDisabled)}>
                        <Legend hasDots title={t('views.commercedetail.settingsection.typecharge.type')}>
                            <span className={styles.Title}>
                                {t('views.commercedetail.settingsection.typecharge.type')}:{' '}
                            </span>

                            <span>{t(`views.commercedetail.settingsection.typecharge.${tCharge.type}`)}</span>
                        </Legend>

                        <Legend hasDots title={t('views.commercedetail.settingsection.typecharge.amount')}>
                            <span className={styles.Title}>
                                {t('views.commercedetail.settingsection.typecharge.amount')}:{' '}
                            </span>

                            <span>
                                {amountFormat(tCharge.value, 2)} {tCharge.symbol}
                            </span>
                        </Legend>
                    </div>
                ))}

                <Legend hasDots title={t('views.commercedetail.settingsection.applycharge.amount')}>
                    <span className={styles.Title}>{t('views.commercedetail.settingsection.applycharge.title')}: </span>

                    <span>{t(`views.commercedetail.settingsection.applycharge.${commerce?.applyCharge}`)}</span>
                </Legend>

                {commerce?.smsAlerts}
                <div className={styles.TypeOrder}>
                    <Legend className={styles.Title} hasDots>
                        {t('views.commercedetail.settingsection.smsAlerts')}
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
