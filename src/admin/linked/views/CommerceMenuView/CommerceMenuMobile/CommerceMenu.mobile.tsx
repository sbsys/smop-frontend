/* react */
import { memo } from 'react';
/* context */
import { useCommerceMenuContext } from '../CommerceMenu.context';
/* layouts */
import { DropLayout, PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button } from 'shared/components';
import { CommerceMenuFilter } from '../CommerceMenuFilter';
import { NewMenuAction } from '../CommerceMenuActions';
import { CommerceMenuItem } from '../CommerceMenuItem';
/* hooks */
import { useAdminLang } from 'admin/core';
/* assets */
import { MdClose, MdFilterList } from 'react-icons/md';
/* styles */
import styles from './CommerceMenu.module.scss';

const CommerceMenuMobile = () => {
    const {
        /* states */
        linkedTitleList,
        isDropFilter,
        isBreakPoint,
        /* functions */
        showDropFilter,
        hideDropFilter,
    } = useCommerceMenuContext();

    const { translate } = useAdminLang();

    return (
        <PanelLayout className={styles.CommerceMenu}>
            <div className={styles.Header}>
                <span>
                    <NewMenuAction />
                </span>

                <DropLayout
                    isDrop={isDropFilter && !isBreakPoint}
                    dropCol="start"
                    dropRow="end"
                    anchorCol="start"
                    anchorRow="end"
                    drop={
                        <PanelLayout className={styles.FilterContent} orientation="col">
                            <Button onClick={hideDropFilter} title={translate('actions.close')}>
                                <i>
                                    <MdClose />
                                </i>
                            </Button>

                            <CommerceMenuFilter />
                        </PanelLayout>
                    }>
                    <Button className={styles.Filter} onClick={showDropFilter} title={translate('actions.open')}>
                        <i>
                            <MdFilterList />
                        </i>
                    </Button>
                </DropLayout>
            </div>

            <ScrollLayout classNameContent={styles.List} orientation="col">
                <ul>
                    {linkedTitleList.map((title, index) => (
                        <li key={index}>
                            <CommerceMenuItem {...title} />
                        </li>
                    ))}
                </ul>
            </ScrollLayout>
        </PanelLayout>
    );
};

export default memo(CommerceMenuMobile);
