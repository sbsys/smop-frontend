/* react */
import { memo } from 'react';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* layouts */
import { TableLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { AdminLang, useAdminLang, WeekDay } from 'admin/core';
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
        showUpdateAttention,
    } = useCommerceDetailContext();

    const { translate } = useAdminLang();

    return (
        <section className={SectionStyles.Section}>
            <div className={SectionStyles.Title}>
                <h2 title={translate('commercedetail.attention')}>
                    <Legend hasDots>{translate('commercedetail.attention')}</Legend>
                </h2>

                <Button
                    className={ButtonStyles.OutlineNone}
                    onClick={showUpdateAttention}
                    title={translate('actions.edit')}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            <div className={styles.Attention}>
                <div className={styles.Times}>
                    <Legend className={styles.Title} hasDots title={translate('commercedetail.onsite')}>
                        {translate('commercedetail.onsite')}
                    </Legend>

                    <TableLayout
                        className={styles.Table}
                        header={{
                            columns: [
                                {
                                    children: <Legend hasDots>{translate('day.opening')}</Legend>,
                                },
                                {
                                    children: <Legend hasDots>{translate('day.closing')}</Legend>,
                                },
                                {
                                    children: <Legend hasDots>{translate('day.weekday')}</Legend>,
                                },
                                {
                                    span: 1,
                                },
                            ],
                        }}
                        body={commerce?.serviceHours.onsite.map(item => ({
                            columns: [
                                {
                                    children: (
                                        <div>
                                            {item.schedules.map((schedule, index) => (
                                                <Legend key={index} hasDots>
                                                    {schedule.opening}
                                                </Legend>
                                            ))}
                                        </div>
                                    ),
                                },
                                {
                                    children: (
                                        <div>
                                            {item.schedules.map((schedule, index) => (
                                                <Legend key={index} hasDots>
                                                    {schedule.closing}
                                                </Legend>
                                            ))}
                                        </div>
                                    ),
                                },
                                {
                                    children: (
                                        <Legend hasDots>{translate(`day.${item.key.toLowerCase() as WeekDay}`)}</Legend>
                                    ),
                                },
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

                    <Legend className={styles.Title} title={translate('commercedetail.onsitepreparation')}>
                        {translate('commercedetail.onsitepreparation')}:
                    </Legend>

                    <Legend>
                        {commerce?.onsitePreparationTime.hours} {translate('time.hours')}
                        {' & '}
                        {commerce?.onsitePreparationTime.minutes} {translate('time.minutes')}
                    </Legend>

                    <Legend className={styles.Title} hasDots title={translate('commercedetail.pickup' as AdminLang)}>
                        {translate('commercedetail.pickup' as AdminLang)}
                    </Legend>

                    <TableLayout
                        className={styles.Table}
                        header={{
                            columns: [
                                {
                                    children: <Legend hasDots>{translate('day.opening')}</Legend>,
                                },
                                {
                                    children: <Legend hasDots>{translate('day.closing')}</Legend>,
                                },
                                {
                                    children: <Legend hasDots>{translate('day.weekday')}</Legend>,
                                },
                                {
                                    span: 1,
                                },
                            ],
                        }}
                        body={commerce?.serviceHours.pickup.map(item => ({
                            columns: [
                                {
                                    children: (
                                        <div>
                                            {item.schedules.map((schedule, index) => (
                                                <Legend key={index} hasDots>
                                                    {schedule.opening}
                                                </Legend>
                                            ))}
                                        </div>
                                    ),
                                },
                                {
                                    children: (
                                        <div>
                                            {item.schedules.map((schedule, index) => (
                                                <Legend key={index} hasDots>
                                                    {schedule.closing}
                                                </Legend>
                                            ))}
                                        </div>
                                    ),
                                },
                                {
                                    children: (
                                        <Legend hasDots>{translate(`day.${item.key.toLowerCase() as WeekDay}`)}</Legend>
                                    ),
                                },
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
                </div>

                <div className={styles.Times}>
                    <Legend className={styles.Title} hasDots title={translate('commercedetail.delivery')}>
                        {translate('commercedetail.delivery')}
                    </Legend>

                    <TableLayout
                        className={styles.Table}
                        header={{
                            columns: [
                                {
                                    children: <Legend hasDots>{translate('day.opening')}</Legend>,
                                },
                                {
                                    children: <Legend hasDots>{translate('day.closing')}</Legend>,
                                },
                                {
                                    children: <Legend hasDots>{translate('day.weekday')}</Legend>,
                                },
                                {
                                    span: 1,
                                },
                            ],
                        }}
                        body={commerce?.serviceHours.delivery.map(item => ({
                            columns: [
                                {
                                    children: (
                                        <div>
                                            {item.schedules.map((schedule, index) => (
                                                <Legend key={index} hasDots>
                                                    {schedule.opening}
                                                </Legend>
                                            ))}
                                        </div>
                                    ),
                                },
                                {
                                    children: (
                                        <div>
                                            {item.schedules.map((schedule, index) => (
                                                <Legend key={index} hasDots>
                                                    {schedule.closing}
                                                </Legend>
                                            ))}
                                        </div>
                                    ),
                                },
                                {
                                    children: (
                                        <Legend hasDots>{translate(`day.${item.key.toLowerCase() as WeekDay}`)}</Legend>
                                    ),
                                },
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

                    <Legend className={styles.Title} title={translate('commercedetail.deliverypreparation')}>
                        {translate('commercedetail.deliverypreparation')}:
                    </Legend>

                    <Legend>
                        {commerce?.deliveryPreparationTime.hours} {translate('time.hours')}
                        {' & '}
                        {commerce?.deliveryPreparationTime.minutes} {translate('time.minutes')}
                    </Legend>

                    <Legend className={styles.Title} hasDots title={translate('commercedetail.curbside' as AdminLang)}>
                        {translate('commercedetail.curbside' as AdminLang)}
                    </Legend>

                    <TableLayout
                        className={styles.Table}
                        header={{
                            columns: [
                                {
                                    children: <Legend hasDots>{translate('day.opening')}</Legend>,
                                },
                                {
                                    children: <Legend hasDots>{translate('day.closing')}</Legend>,
                                },
                                {
                                    children: <Legend hasDots>{translate('day.weekday')}</Legend>,
                                },
                                {
                                    span: 1,
                                },
                            ],
                        }}
                        body={commerce?.serviceHours.curbside.map(item => ({
                            columns: [
                                {
                                    children: (
                                        <div>
                                            {item.schedules.map((schedule, index) => (
                                                <Legend key={index} hasDots>
                                                    {schedule.opening}
                                                </Legend>
                                            ))}
                                        </div>
                                    ),
                                },
                                {
                                    children: (
                                        <div>
                                            {item.schedules.map((schedule, index) => (
                                                <Legend key={index} hasDots>
                                                    {schedule.closing}
                                                </Legend>
                                            ))}
                                        </div>
                                    ),
                                },
                                {
                                    children: (
                                        <Legend hasDots>{translate(`day.${item.key.toLowerCase() as WeekDay}`)}</Legend>
                                    ),
                                },
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
                </div>
            </div>
        </section>
    );
};

export default memo(CommerceAttentionSection);
