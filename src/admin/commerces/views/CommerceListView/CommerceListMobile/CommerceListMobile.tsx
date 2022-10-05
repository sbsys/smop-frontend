/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* layouts */
import { DropLayout, PanelLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { CommerceListFilter } from '../CommerceListFilter';
/* assets */
import { MdClose, MdFilterList } from 'react-icons/md';
/* styles */
import styles from './CommerceListMobile.module.scss';

const CommerceListMobile = () => {
    const { t } = useTranslation();

    return (
        <PanelLayout className={styles.CommerceList}>
            <div className={styles.Header}>
                <h1 title={t('views.commercelist.title')}>
                    <Legend hasDots>{t('views.commercelist.title')}</Legend>
                </h1>

                <DropLayout
                    isDrop={false}
                    dropCol="start"
                    dropRow="end"
                    anchorCol="start"
                    anchorRow="end"
                    drop={
                        <PanelLayout className={styles.FilterContent} orientation="col">
                            <Button title={t('views.commercelist.actions.closefilter')}>
                                <i>
                                    <MdClose />
                                </i>
                            </Button>

                            <CommerceListFilter />
                        </PanelLayout>
                    }>
                    <Button className={styles.Filter} title={t('views.commercelist.actions.openfilter')}>
                        <i>
                            <MdFilterList />
                        </i>
                    </Button>
                </DropLayout>
            </div>
        </PanelLayout>
    );
};

export default memo(CommerceListMobile);
