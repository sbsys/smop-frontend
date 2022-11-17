/* react */
import { memo } from 'react';
/* context */
import { useCommerceListContext } from '../CommerceList.context';
/* layouts */
import { DropLayout, PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { CommerceListFilter } from '../CommerceListFilter';
import { NewCommerceAction } from '../CommerceListActions';
import { CommerceListItem } from '../CommerceListItem';
/* hooks */
import { useAdminLang } from 'admin/core';
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

    const { translate } = useAdminLang();

    return (
        <PanelLayout className={styles.CommerceList}>
            <div className={styles.Header}>
                <h1 title={translate('commercelist.title')}>
                    <Legend hasDots>{translate('commercelist.title')}</Legend>
                </h1>

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

                            <CommerceListFilter />
                        </PanelLayout>
                    }>
                    <Button className={styles.Filter} onClick={showDropFilter} title={translate('actions.open')}>
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
