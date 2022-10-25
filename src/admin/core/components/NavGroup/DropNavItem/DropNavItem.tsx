/* react */
import { FC, memo } from 'react';
/* props */
import { DropNavItemProps } from './DropNavItem.props';
/* hooks */
import { useActive } from 'shared/hooks';
/* layouts */
import { AccordionLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { NavItem } from '../NavItem';
/* utils */
import { classNames } from 'shared/utils';
/* assets */
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
/* styles */
import styles from './DropNavItem.module.scss';

const DropNavItem: FC<DropNavItemProps> = ({ className, icon, text, items }) => {
    const [isDrop, , , toggleDrop] = useActive(true);

    return (
        <AccordionLayout
            isAccordion={isDrop}
            accordion={
                <ul className={styles.List}>
                    {items.map((item, index) => (
                        <li key={index}>
                            <NavItem {...item} />
                        </li>
                    ))}
                </ul>
            }>
            <Button className={classNames(styles.DropNavItem, isDrop && styles.Open, className)} onClick={toggleDrop}>
                <i>{typeof icon === 'function' ? icon() : icon}</i>

                <Legend hasDots>{text}</Legend>

                <i>{isDrop ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</i>
            </Button>
        </AccordionLayout>
    );
};

export default memo(DropNavItem);
