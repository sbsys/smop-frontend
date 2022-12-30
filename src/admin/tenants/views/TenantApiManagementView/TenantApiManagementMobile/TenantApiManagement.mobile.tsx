/* react */
import { memo } from 'react';
/* context */
import { useTenantApiManagementContext } from '../TenantApiManagement.context';
/* layouts */
import { DropLayout, PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { KeyListItem } from '../KeyListItem';
import { NewKeyAction } from '../KeyListActions';
import { KeyListFilter } from '../KeyListFilter';
/* hooks */
import { useAdminLang } from 'admin/core';
/* assets */
import { MdClose, MdFilterList } from 'react-icons/md';
/* styles */
import styles from './TenantApiManagement.module.scss';

const TenantApiManagementMobile = () => {
    const {
        /* states */
        keyList,
        isDropFilter,
        isBreakPoint,
        /* functions */
        showDropFilter,
        hideDropFilter,
    } = useTenantApiManagementContext();

    const { translate } = useAdminLang();

    return (
        <PanelLayout className={styles.TenantApiManagement}>
            <div className={styles.Header}>
                <h1 title={translate('keylist.title')}>
                    <Legend hasDots>{translate('keylist.title')}</Legend>
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

                            {!isBreakPoint && <KeyListFilter />}
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
                <NewKeyAction />
            </span>

            <ScrollLayout classNameContent={styles.List} orientation="col">
                <ul>
                    {keyList.map((keyItem, index) => (
                        <li key={index}>{<KeyListItem {...keyItem} />}</li>
                    ))}
                </ul>
            </ScrollLayout>
        </PanelLayout>
    );
};

export default memo(TenantApiManagementMobile);
