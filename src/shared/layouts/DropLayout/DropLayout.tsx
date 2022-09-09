/* react */
import { forwardRef, memo } from 'react';
/* props */
import { DropLayoutProps } from './DropLayout.props';
/* utils */
import { classNames } from 'shared/utils';
/* types */
import { Alignment } from 'shared/types';
/* styles */
import styles from './DropLayout.module.scss';

/* drop row strategy */
const dropRowStrategy: Record<Alignment, string> = {
    start: styles.DropRowStart,
    center: styles.DropRowCenter,
    end: styles.DropRowEnd,
};

/* drop col strategy */
const dropColStrategy: Record<Alignment, string> = {
    start: styles.DropColStart,
    center: styles.DropColCenter,
    end: styles.DropColEnd,
};

/* anchor row strategy */
const anchorRowStrategy: Record<Alignment, string> = {
    start: styles.AnchorRowStart,
    center: styles.AnchorRowCenter,
    end: styles.AnchorRowEnd,
};

/* anchor col strategy */
const anchorColStrategy: Record<Alignment, string> = {
    start: styles.AnchorColStart,
    center: styles.AnchorColCenter,
    end: styles.AnchorColEnd,
};

const DropLayout = forwardRef<HTMLDivElement | null, DropLayoutProps>(
    (
        {
            className,
            classNameDrop,
            drop,
            dropRow = 'center',
            dropCol = 'start',
            anchorRow = 'center',
            anchorCol = 'end',
            isDrop,
            isHoverable,
            children,
            ...rest
        },
        ref
    ) => {
        return (
            <div className={classNames(styles.Drop, isHoverable && styles.Hoverable, className)} ref={ref} {...rest}>
                {typeof children === 'function' ? children() : children}

                {(isDrop || isHoverable) && (
                    <div
                        className={classNames(
                            styles.Content,
                            dropRow && dropRowStrategy[dropRow],
                            dropCol && dropColStrategy[dropCol],
                            anchorRow && anchorRowStrategy[anchorRow],
                            anchorCol && anchorColStrategy[anchorCol],
                            classNameDrop
                        )}>
                        {typeof drop === 'function' ? drop() : drop}
                    </div>
                )}
            </div>
        );
    }
);

export default memo(DropLayout);
