/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useMainTitleListContext } from '../MainTitleList.context';
/* layouts */
import { DropLayout, PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { MainTitleListFilter } from '../MainTitleListFilter';
import { NewMainTitleAction } from '../MainTitleListActions';
import { MainTitleListItem } from '../MainTitleListItem';
/* assets */
import { MdClose, MdFilterList } from 'react-icons/md';
/* styles */
import styles from './MainTitleList.module.scss';

const MainTitleListMobile = () => {
    const {
        /* states */
        isDropFilter,
        isBreakPoint,
        mainTitleList,
        showDropFilter,
        hideDropFilter,
    } = useMainTitleListContext();

    const { t } = useTranslation();

    return (
        <PanelLayout className={styles.MainTitleList}>
            <div className={styles.Header}>
                <h1 title={t('views.maintitlelist.title')}>
                    <Legend hasDots>{t('views.maintitlelist.title')}</Legend>
                </h1>

                <DropLayout
                    isDrop={isDropFilter && !isBreakPoint}
                    dropCol="start"
                    dropRow="end"
                    anchorCol="start"
                    anchorRow="end"
                    drop={
                        <PanelLayout className={styles.FilterContent} orientation="col">
                            <Button title={t('views.maintitlelist.actions.closefilter')} onClick={hideDropFilter}>
                                <i>
                                    <MdClose />
                                </i>
                            </Button>

                            {!isBreakPoint && <MainTitleListFilter />}
                        </PanelLayout>
                    }>
                    <Button
                        className={styles.Filter}
                        title={t('views.maintitlelist.actions.openfilter')}
                        onClick={showDropFilter}>
                        <i>
                            <MdFilterList />
                        </i>
                    </Button>
                </DropLayout>
            </div>

            <span>
                <NewMainTitleAction />
            </span>

            <ScrollLayout classNameContent={styles.List} orientation="col">
                <ul>
                    {mainTitleList.map((title, index) => (
                        <li key={index}>{<MainTitleListItem {...title} />}</li>
                    ))}
                </ul>
            </ScrollLayout>
        </PanelLayout>
    );
};

export default memo(MainTitleListMobile);
