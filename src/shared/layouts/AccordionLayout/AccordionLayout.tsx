/* react */
import { forwardRef, memo } from 'react';
/* props */
import { AccordionLayoutProps } from './AccordionLayout.props';
/* utils */
import { classNames } from 'shared/utils';
/* types */
import { Position } from 'shared/types';
/* styles */
import styles from './AccordionLayout.module.scss';

/* open to strategy */
const openToStrategy: Record<Position, string> = {
    top: styles.Top,
    bottom: styles.Bottom,
    left: styles.Left,
    right: styles.Right,
};

const AccordionLayout = forwardRef<HTMLDivElement | null, AccordionLayoutProps>(
    (
        { className, classNameAccordion, openTo = 'bottom', accordion, isAccordion, isHoverable, children, ...rest },
        ref
    ) => {
        return (
            <div
                className={classNames(
                    styles.AccordionLayout,
                    openTo && openToStrategy[openTo],
                    isHoverable && styles.Hoverable,
                    className
                )}
                ref={ref}
                {...rest}>
                {typeof children === 'function' ? children() : children}

                {(isAccordion || isHoverable) && (
                    <div className={classNames(styles.Content, classNameAccordion)}>
                        {typeof accordion === 'function' ? accordion() : accordion}
                    </div>
                )}
            </div>
        );
    }
);

export default memo(AccordionLayout);
