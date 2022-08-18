/* react */
import { forwardRef, memo } from 'react';
/* props */
import { PanelLayoutProps } from './PanelLayout.props';
/* utils */
import { classNames } from 'shared/utils';
/* types */
import { Orientation } from 'shared/types';
/* styles */
import styles from './PanelLayout.module.scss';

const orientationStrategy: Record<Orientation, string> = {
    col: styles.Col,
    row: styles.Row,
};

const PanelLayout = forwardRef<HTMLDivElement | null, PanelLayoutProps>(
    ({ className, orientation, children, ...rest }, ref) => {
        return (
            <div
                className={classNames(
                    styles.PanelLayout,
                    orientation && orientationStrategy[orientation],
                    className
                )}
                ref={ref}
                {...rest}>
                {typeof children === 'function' ? children() : children}
            </div>
        );
    }
);

export default memo(PanelLayout);
