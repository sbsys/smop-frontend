/* react */
import { memo } from 'react';
/* layouts */
import { AccordionLayout } from 'shared/layouts';
/* styles */
import styles from './CurrentMenu.module.scss';

const CurrentMenu = () => {
    return (
        <AccordionLayout isAccordion className={styles.CurrentMenu}>
            CurrentMenu
        </AccordionLayout>
    );
};

export default memo(CurrentMenu);
