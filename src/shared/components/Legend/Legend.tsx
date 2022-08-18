/* react */
import { FC, memo } from 'react';
/* props */
import { LegendProps } from './Legend.props';
/* utils */
import { classNames } from 'shared/utils';
/* styles */
import styles from './Legend.module.scss';

/* styles */
const justifyStyles: Record<string, string> = {
    start: styles.Start,
    center: styles.Center,
    end: styles.End,
};

const Legend: FC<LegendProps> = ({
    className,
    classNameContent,
    justify,
    hasDots,
    children,
    ...rest
}) => {
    return (
        <span
            className={classNames(
                styles.Legend,
                justify && justifyStyles[justify],
                hasDots && styles.Dots,
                className
            )}
            {...rest}>
            <span className={classNameContent}>
                {typeof children === 'function' ? children() : children}
            </span>
        </span>
    );
};

export default memo(Legend);
