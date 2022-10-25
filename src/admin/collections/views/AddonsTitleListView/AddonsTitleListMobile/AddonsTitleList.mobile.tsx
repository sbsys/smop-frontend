/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useAddonsTitleListContext } from '../AddonsTitleList.context';
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

    const { t } = useTranslation();

    return (
        <PanelLayout className={styles.AddonsTitleList}>
            <div className={styles.Header}>
                <h1 title={t('views.addonstitlelist.title')}>
                    <Legend hasDots>{t('views.addonstitlelist.title')}</Legend>
                </h1>

                <DropLayout
                    isDrop={isDropFilter && !isBreakPoint}
                    dropCol="start"
                    dropRow="end"
                    anchorCol="start"
                    anchorRow="end"
                    drop={
                        <PanelLayout className={styles.FilterContent} orientation="col">
                            <Button title={t('views.addonstitlelist.actions.closefilter')} onClick={hideDropFilter}>
                                <i>
                                    <MdClose />
                                </i>
                            </Button>

                            {!isBreakPoint && <AddonsTitleListFilter />}
                        </PanelLayout>
                    }>
                    <Button
                        className={styles.Filter}
                        title={t('views.addonstitlelist.actions.openfilter')}
                        onClick={showDropFilter}>
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
