/* react */
import { memo, useContext } from 'react';
/* context */
import { TenantListContext } from '../TenantList.context';
/* layouts */
import { DropLayout, PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { TenantListFilter } from '../TenantListFilter';
import { NewTenantAction, TenantListItem } from '../TenantList';
/* assets */
import { MdClose, MdFilterList } from 'react-icons/md';
/* styles */
import styles from './TenantListMobile.module.scss';

const TenantListMobile = () => {
    const {
        /* states */
        isDropFilter,
        showDropFilter,
        hideDropFilter,
    } = useContext(TenantListContext);

    return (
        <PanelLayout className={styles.TenantList}>
            <div className={styles.Header}>
                <h1>
                    <Legend hasDots>Tenants</Legend>
                </h1>

                <DropLayout
                    isDrop={isDropFilter}
                    dropCol="start"
                    dropRow="end"
                    anchorCol="start"
                    anchorRow="end"
                    drop={
                        <PanelLayout className={styles.FilterContent} orientation="col">
                            <Button onClick={hideDropFilter}>
                                <i>
                                    <MdClose />
                                </i>
                            </Button>

                            <TenantListFilter />
                        </PanelLayout>
                    }>
                    <Button className={styles.Filter} onClick={showDropFilter}>
                        <i>
                            <MdFilterList />
                        </i>
                    </Button>
                </DropLayout>
            </div>

            <span>
                <NewTenantAction />
            </span>

            <ScrollLayout orientation="col">
                <TenantListItem />
            </ScrollLayout>
        </PanelLayout>
    );
};

export default memo(TenantListMobile);
