/* react */
import { memo } from 'react';
/* context */
import { useMainTitleListContext } from '../MainTitleList.context';
/* layouts */
import { DropLayout, PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { MainTitleListFilter } from '../MainTitleListFilter';
import { NewMainTitleAction } from '../MainTitleListActions';
import { MainTitleListItem } from '../MainTitleListItem';
/* hooks */
import { useAdminLang } from 'admin/core';
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

    const { translate } = useAdminLang();

    return (
        <PanelLayout className={styles.MainTitleList}>
            <div className={styles.Header}>
                <h1 title={translate('maintitlelist.title')}>
                    <Legend hasDots>{translate('maintitlelist.title')}</Legend>
                </h1>

                <DropLayout
                    isDrop={isDropFilter && !isBreakPoint}
                    dropCol="start"
                    dropRow="end"
                    anchorCol="start"
                    anchorRow="end"
                    drop={
                        <PanelLayout className={styles.FilterContent} orientation="col">
                            <Button title={translate('actions.close')} onClick={hideDropFilter}>
                                <i>
                                    <MdClose />
                                </i>
                            </Button>

                            {!isBreakPoint && <MainTitleListFilter />}
                        </PanelLayout>
                    }>
                    <Button className={styles.Filter} title={translate('actions.open')} onClick={showDropFilter}>
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
