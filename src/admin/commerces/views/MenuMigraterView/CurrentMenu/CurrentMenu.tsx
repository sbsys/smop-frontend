/* react */
import { memo } from 'react';
/* context */
import { useMenuMigraterContext } from '../MenuMigrater.context';
/* layouts */
import { MenuLayout } from '../MenuLayout';
/* components */
import { Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
/* assets */
import { FeaturesSrc } from 'assets';
/* styles */
import styles from './CurrentMenu.module.scss';

const CurrentMenu = () => {
    const {
        /* states */
        isCurrentMenuTabOpen,
        handleOpenCurrentMenuTab,
    } = useMenuMigraterContext();

    const { translate } = useAdminLang();

    return (
        <MenuLayout
            onOpen={handleOpenCurrentMenuTab}
            title={translate('migrater.current')}
            isOpen={isCurrentMenuTabOpen}>
            {false ? (
                <div className={styles.CurrentMenu}>CurrentMenu Content</div>
            ) : (
                <div className={styles.NoCurrentMenu}>
                    <Legend title={translate('migrater.nocurrent')} justify="center">
                        {translate('migrater.nocurrent')}
                    </Legend>

                    <img src={FeaturesSrc} alt={translate('migrater.nocurrent')} />
                </div>
            )}
        </MenuLayout>
    );
};

export default memo(CurrentMenu);
