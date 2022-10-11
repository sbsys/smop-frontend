/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* styles */
import styles from './UserListMobile.module.scss';

const UserListMobile = () => {
    const { t } = useTranslation();

    return (
        <PanelLayout className={styles.UserList}>
            {/* <div className={styles.Header}>
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
            </ScrollLayout> */}
        </PanelLayout>
    );
};

export default memo(UserListMobile);
