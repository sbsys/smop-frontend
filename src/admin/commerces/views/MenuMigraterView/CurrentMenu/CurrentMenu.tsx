/* react */
import { memo } from 'react';
/* context */
import { useMenuMigraterContext } from '../MenuMigrater.context';
/* layouts */
import { MenuLayout } from '../MenuLayout';
/* components */
import { Legend } from 'shared/components';
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

    return (
        <MenuLayout onOpen={handleOpenCurrentMenuTab} title="CurrentMenu" isOpen={isCurrentMenuTabOpen}>
            {false ? (
                <div className={styles.CurrentMenu}>CurrentMenu Content</div>
            ) : (
                <div className={styles.NoCurrentMenu}>
                    <Legend title="No current menu" justify="center">
                        No current menu
                    </Legend>

                    <img src={FeaturesSrc} alt="No current menu" />
                </div>
            )}
        </MenuLayout>
    );
};

export default memo(CurrentMenu);
