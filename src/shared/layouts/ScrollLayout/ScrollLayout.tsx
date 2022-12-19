/* react */
import { forwardRef, memo, useRef, WheelEvent } from 'react';
/* props */
import { ScrollLayoutProps } from './ScrollLayout.props';
/* layouts */
import { PanelLayout } from '../PanelLayout';
/* utils */
import { classNames } from 'shared/utils';
/* types */
import { Orientation } from 'shared/types';
/* styles */
import styles from './ScrollLayout.module.scss';

const orientationStrategy: Record<Orientation, string> = {
    col: styles.Col,
    row: styles.Row,
};

const ScrollLayout = forwardRef<HTMLDivElement | null, ScrollLayoutProps>(
    ({ classNameContent, orientation, children, ...rest }, ref) => {
        const scrollRef = useRef<HTMLDivElement | null>(null);

        const handleRowScroll = (event: WheelEvent<HTMLDivElement>) => {
            if (!scrollRef.current) return;

            scrollRef.current.scrollBy({
                behavior: 'auto',
                left: event.deltaY,
            });
        };

        return (
            <PanelLayout orientation={orientation} ref={ref} {...rest}>
                <div
                    className={classNames(
                        styles.ScrollLayout,
                        orientation && orientationStrategy[orientation],
                        classNameContent
                    )}
                    ref={orientation === 'row' ? scrollRef : undefined}
                    onWheel={orientation === 'row' ? handleRowScroll : undefined}>
                    {typeof children === 'function' ? children() : children}
                </div>
            </PanelLayout>
        );
    }
);

export default memo(ScrollLayout);
