/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import { CommerceListFilter } from '../CommerceListFilter';
/* styles */
import styles from './CommerceListDesktop.module.scss';

const CommerceListDesktop = () => {
    const { t } = useTranslation();

    return (
        <PanelLayout className={styles.CommerceList}>
            <h1 title={t('views.commercelist.title')}>
                <Legend hasDots>{t('views.commercelist.title')}</Legend>
            </h1>

            <section className={styles.Filter}>
                <CommerceListFilter />
            </section>
        </PanelLayout>
    );
};

export default memo(CommerceListDesktop);
