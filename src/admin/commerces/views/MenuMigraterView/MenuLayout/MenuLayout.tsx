/* react */
import { FC, memo } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
/* context */
import { useMenuMigraterContext } from '../MenuMigrater.context';
/* layouts */
import { AccordionLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
/* utils */
import { classNames } from 'shared/utils';
/* assets */
import { MdOpenInFull } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './MenuLayout.module.scss';

interface MenuLayoutProps extends ChildrenProps {
    title: string;
    isOpen?: boolean;
    onOpen: () => void;
}

const MenuLayout: FC<MenuLayoutProps> = ({ title, isOpen, onOpen, children }) => {
    const {
        /* states */
        isBreakPoint,
    } = useMenuMigraterContext();

    const { translate } = useAdminLang();

    return (
        <section className={classNames(styles.MenuLayout, (isOpen || isBreakPoint) && styles.Extended)}>
            <AccordionLayout
                isAccordion={isOpen || isBreakPoint}
                className={styles.Accordion}
                classNameAccordion={styles.Content}
                accordion={children}>
                <div className={styles.Header}>
                    <Legend hasDots title={title}>
                        {title}
                    </Legend>

                    {!(isOpen || isBreakPoint) && (
                        <Button
                            className={ButtonStyles.FillSecondary}
                            title={translate('actions.open')}
                            onClick={onOpen}>
                            <i>
                                <MdOpenInFull />
                            </i>
                        </Button>
                    )}
                </div>
            </AccordionLayout>
        </section>
    );
};

export default memo(MenuLayout);
