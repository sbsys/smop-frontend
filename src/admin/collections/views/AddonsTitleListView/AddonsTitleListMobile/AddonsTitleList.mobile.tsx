/* react */
import { memo } from 'react';
/* context */
import { useAddonsTitleListContext } from '../AddonsTitleList.context';
/* hooks */
import { useAdminLang } from 'admin/core';
/* layouts */
import { DropLayout, PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { AddonsTitleListFilter } from '../AddonsTitleListFilter';
import { NewAddonsTitleAction } from '../AddonsTitleListActions';
import { AddonsTitleListItem } from '../AddonsTitleListItem';
/* assets */
import { MdClose, MdFilterList } from 'react-icons/md';
/* styles */
import styles from './AddonsTitleList.module.scss';

const AddonsTitleListMobile = () => {
    const {
        /* states */
        isDropFilter,
        isBreakPoint,
        addonsTitleList,
        showDropFilter,
        hideDropFilter,
    } = useAddonsTitleListContext();

    const { translate } = useAdminLang();

    return (
        <PanelLayout className={styles.AddonsTitleList}>
            <div className={styles.Header}>
                <h1 title={translate('addontitlelist.title')}>
                    <Legend hasDots>{translate('addontitlelist.title')}</Legend>
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

                            {!isBreakPoint && <AddonsTitleListFilter />}
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
                <NewAddonsTitleAction />
            </span>

            <ScrollLayout classNameContent={styles.List} orientation="col">
                <ul>
                    {addonsTitleList.map((title, index) => (
                        <li key={index}>{<AddonsTitleListItem {...title} />}</li>
                    ))}
                </ul>
            </ScrollLayout>
        </PanelLayout>
    );
};

export default memo(AddonsTitleListMobile);
