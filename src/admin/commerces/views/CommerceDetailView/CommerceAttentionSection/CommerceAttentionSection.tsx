/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* layouts */
import { TableLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* utils */
import { classNames } from 'shared/utils';
/* assets */
import { MdCheckCircle, MdEdit } from 'react-icons/md';
import { IoMdCloseCircle } from 'react-icons/io';
/* styles */
import { ButtonStyles } from 'shared/styles';
import SectionStyles from '../CommerceDetail.module.scss';
import styles from './CommerceAttentionSection.module.scss';

const CommerceAttentionSection = () => {
    const {
        /* states */
        commerce,
    } = useCommerceDetailContext();

    const { t } = useTranslation();

    return (
        <section className={SectionStyles.Section}>
            <div className={SectionStyles.Title}>
                <h2 title={t('views.commercedetail.attentionsection.title')}>
                    <Legend hasDots>{t('views.commercedetail.attentionsection.title')}</Legend>
                </h2>

                <Button className={ButtonStyles.OutlineNone} title={t('views.commercedetail.attentionsection.edit')}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            <div className={styles.Attention}>
                <div className={styles.Times}>
                    <Legend
                        className={styles.Title}
                        hasDots
                        title={t('views.commercedetail.attentionsection.onsite.title')}>
                        {t('views.commercedetail.attentionsection.onsite.title')}
                    </Legend>

                    <TableLayout
                        className={styles.Table}
                        header={{
                            columns: [
                                {
                                    children: (
                                        <Legend hasDots>
                                            {t('views.commercedetail.attentionsection.onsite.opening')}
                                        </Legend>
                                    ),
                                },
                                {
                                    children: (
                                        <Legend hasDots>
                                            {t('views.commercedetail.attentionsection.onsite.closing')}
                                        </Legend>
                                    ),
                                },
                                {
                                    children: (
                                        <Legend hasDots>
                                            {t('views.commercedetail.attentionsection.onsite.weekday')}
                                        </Legend>
                                    ),
                                },
                                {
                                    span: 1,
                                },
                            ],
                        }}
                        body={commerce?.serviceHours.onsite.map(item => ({
                            columns: [
                                {
                                    children: item.opening,
                                },
                                {
                                    children: item.closing,
                                },
                                { children: <Legend hasDots>{t(`weekday.${item.key.toLowerCase()}`)}</Legend> },
                                {
                                    children: (
                                        <i
                                            className={classNames(
                                                styles.Icon,
                                                item.enabled ? styles.Active : styles.Inactive
                                            )}>
                                            {item.enabled ? <MdCheckCircle /> : <IoMdCloseCircle />}
                                        </i>
                                    ),
                                },
                            ],
                        }))}
                    />

                    <Legend hasDots title={t('views.commercedetail.attentionsection.onsite.preparation')}>
                        <span className={styles.Title}>
                            {t('views.commercedetail.attentionsection.onsite.preparation')}:{' '}
                        </span>

                        <span>
                            {commerce?.onsitePreparationTime.hours} {t('time.hours')}
                            {' & '}
                            {commerce?.onsitePreparationTime.minutes} {t('time.minutes')}
                        </span>
                    </Legend>
                </div>

                <div className={styles.Times}>
                    <Legend
                        className={styles.Title}
                        hasDots
                        title={t('views.commercedetail.attentionsection.delivery.title')}>
                        {t('views.commercedetail.attentionsection.delivery.title')}
                    </Legend>

                    <TableLayout
                        className={styles.Table}
                        header={{
                            columns: [
                                {
                                    children: (
                                        <Legend hasDots>
                                            {t('views.commercedetail.attentionsection.delivery.opening')}
                                        </Legend>
                                    ),
                                },
                                {
                                    children: (
                                        <Legend hasDots>
                                            {t('views.commercedetail.attentionsection.delivery.closing')}
                                        </Legend>
                                    ),
                                },
                                {
                                    children: (
                                        <Legend hasDots>
                                            {t('views.commercedetail.attentionsection.delivery.weekday')}
                                        </Legend>
                                    ),
                                },
                                {
                                    span: 1,
                                },
                            ],
                        }}
                        body={commerce?.serviceHours.delivery.map(item => ({
                            columns: [
                                {
                                    children: item.opening,
                                },
                                {
                                    children: item.closing,
                                },
                                { children: <Legend hasDots>{t(`weekday.${item.key.toLowerCase()}`)}</Legend> },
                                {
                                    children: (
                                        <i
                                            className={classNames(
                                                styles.Icon,
                                                item.enabled ? styles.Active : styles.Inactive
                                            )}>
                                            {item.enabled ? <MdCheckCircle /> : <IoMdCloseCircle />}
                                        </i>
                                    ),
                                },
                            ],
                        }))}
                    />

                    <Legend hasDots title={t('views.commercedetail.attentionsection.delivery.preparation')}>
                        <span className={styles.Title}>
                            {t('views.commercedetail.attentionsection.delivery.preparation')}:{' '}
                        </span>

                        <span>
                            {commerce?.deliveryPreparationTime.hours} {t('time.hours')}
                            {' & '}
                            {commerce?.onsitePreparationTime.minutes} {t('time.minutes')}
                        </span>
                    </Legend>
                </div>
            </div>
        </section>
    );
};

export default memo(CommerceAttentionSection);
