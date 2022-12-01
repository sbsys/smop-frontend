/* react */
import { memo } from 'react';
/* layouts */
import { AccordionLayout } from 'shared/layouts';
/* styles */
import styles from './Migrater.module.scss';

const Migrater = () => {
    return (
        <AccordionLayout isAccordion className={styles.Migrater}>
            Migrater
        </AccordionLayout>
    );
};

export default memo(Migrater);
