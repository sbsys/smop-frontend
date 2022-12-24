/* react */
import { FC, memo, useEffect, useRef } from 'react';
/* layouts */
import { AccordionLayout, TableLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useActive } from 'shared/hooks';
import { useClientsLang } from 'admin/core';
/* utils */
import { classNames } from 'shared/utils';
/* types */
import { ServiceHour, ServiceHours } from 'admin/clients/types';
/* assets */
import { MdArrowDropDown, MdArrowDropUp, MdCheckCircle } from 'react-icons/md';
import { IoMdCloseCircle } from 'react-icons/io';
/* atyles */
import styles from './CommerceInfo.module.scss';

const ServiceHoursTable: FC<{
    serviceHoursKey: keyof ServiceHours;
    isEnabled: boolean;
    serviceHours: ServiceHour[];
}> = ({ serviceHoursKey, isEnabled, serviceHours }) => {
    const [isAccordion, , , toggleAccordion] = useActive();

    const scrollRef = useRef<HTMLDivElement | null>(null);

    const { translate } = useClientsLang();

    useEffect(() => {
        if (!scrollRef.current) return;
        if (!isAccordion) return;

        scrollRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    }, [isAccordion]);

    return (
        <AccordionLayout
            className={styles.Accordion}
            classNameAccordion={styles.AccordionContent}
            isAccordion={isAccordion}
            accordion={serviceHours.map((serviceHour, serviceIndex) => (
                <div key={serviceIndex}>
                    <TableLayout
                        header={{
                            columns: [
                                {
                                    children: (
                                        <Legend hasDots title={translate(`day.${serviceHour.key}`)}>
                                            {translate(`day.${serviceHour.key}`)}
                                        </Legend>
                                    ),
                                    span: 2,
                                },
                            ],
                        }}
                        body={serviceHour.schedules.map((schedule, scheduleIndex) => ({
                            columns: [
                                {
                                    children: (
                                        <Legend justify="center" hasDots title={schedule.opening}>
                                            {schedule.opening}
                                        </Legend>
                                    ),
                                    span: 1,
                                },
                                {
                                    children: (
                                        <Legend justify="center" hasDots title={schedule.closing}>
                                            {schedule.closing}
                                        </Legend>
                                    ),
                                    span: 1,
                                },
                            ],
                        }))}
                    />
                </div>
            ))}>
            <div className={styles.OrderOnline} title={translate(`commercedetail.${serviceHoursKey}`)} ref={scrollRef}>
                <Legend className={styles.Title} hasDots title={translate(`commercedetail.${serviceHoursKey}`)}>
                    {translate(`commercedetail.${serviceHoursKey}`)}
                </Legend>

                <i className={classNames(isEnabled ? styles.Online : styles.Offline)}>
                    {isEnabled ? <MdCheckCircle /> : <IoMdCloseCircle />}
                </i>

                <Button className={styles.AccordionControl} onClick={() => toggleAccordion()}>
                    <i>{isAccordion ? <MdArrowDropUp /> : <MdArrowDropDown />}</i>
                </Button>
            </div>
        </AccordionLayout>
    );
};

export default memo(ServiceHoursTable);
