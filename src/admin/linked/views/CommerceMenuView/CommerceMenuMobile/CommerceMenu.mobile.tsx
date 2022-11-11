/* react */
import { memo } from 'react';
/* context */
import { useCommerceMenuContext } from '../CommerceMenu.context';
/* layouts */
import { DropLayout, PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button } from 'shared/components';
import { NewMenuAction } from '../CommerceMenuActions';
/* hooks */
import { useAdminLang } from 'admin/core';
/* assets */
import { MdClose, MdFilterList } from 'react-icons/md';
/* styles */
import styles from './CommerceMenu.module.scss';

const CommerceMenuMobile = () => {
    const {
        /* states */
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

                            {/* <CommerceMenuListFilter /> */}
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
                    {[].map((_, index) => (
                        <li key={index}>{/* <CommerceMenuListItem {...commerce} /> */}</li>
                    ))}
                </ul>
            </ScrollLayout>
        </PanelLayout>
    );
};

export default memo(CommerceMenuMobile);
