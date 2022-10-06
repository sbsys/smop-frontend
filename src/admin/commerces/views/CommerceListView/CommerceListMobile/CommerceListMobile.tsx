/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useCommerceListContext } from '../CommerceList.context';
/* layouts */
import { DropLayout, PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { CommerceListFilter } from '../CommerceListFilter';
import { NewCommerceAction } from '../CommerceListActions';
import { CommerceListItem } from '../CommerceListItem';
/* assets */
import { MdClose, MdFilterList } from 'react-icons/md';
/* styles */
import styles from './CommerceListMobile.module.scss';

const CommerceListMobile = () => {
    const {
        /* states */
        isBreakPoint,
        isDropFilter,
        showDropFilter,
        hideDropFilter,
        commerceList,
    } = useCommerceListContext();

    const { t } = useTranslation();

    return (
        <PanelLayout className={styles.CommerceList}>
            <div className={styles.Header}>
                <h1 title={t('views.commercelist.title')}>
                    <Legend hasDots>{t('views.commercelist.title')}</Legend>
                </h1>

                <DropLayout
                    isDrop={isDropFilter && !isBreakPoint}
                    dropCol="start"
                    dropRow="end"
                    anchorCol="start"
                    anchorRow="end"
                    drop={
                        <PanelLayout className={styles.FilterContent} orientation="col">
                            <Button onClick={hideDropFilter} title={t('views.commercelist.actions.closefilter')}>
                                <i>
                                    <MdClose />
                                </i>
                            </Button>

                            <CommerceListFilter />
                        </PanelLayout>
                    }>
                    <Button
                        className={styles.Filter}
                        onClick={showDropFilter}
                        title={t('views.commercelist.actions.openfilter')}>
                        <i>
                            <MdFilterList />
                        </i>
                    </Button>
                </DropLayout>
            </div>

            <span>
                <NewCommerceAction />
            </span>

            <ScrollLayout classNameContent={styles.List} orientation="col">
                <ul>
                    {commerceList.map((commerce, index) => (
                        <li key={index}>
                            <CommerceListItem {...commerce} />
                        </li>
                    ))}
                </ul>
            </ScrollLayout>
        </PanelLayout>
    );
};

export default memo(CommerceListMobile);
