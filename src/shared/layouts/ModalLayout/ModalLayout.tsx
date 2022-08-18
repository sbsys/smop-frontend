/* react */
import { FC, memo } from 'react';
import { createPortal } from 'react-dom';
/* props */
import { ModalLayoutProps } from './ModalLayout.props';
/* utils */
import { classNames } from 'shared/utils';
/* types */
import { Alignment } from 'shared/types';
/* styles */
import styles from './ModalLayout.module.scss';

const colAlignmentStrategy: Record<Alignment, string> = {
    start: styles.ColStart,
    center: styles.ColCenter,
    end: styles.ColEnd,
};

const rowAlignmentStrategy: Record<Alignment, string> = {
    start: styles.RowStart,
    center: styles.RowCenter,
    end: styles.RowEnd,
};

const ModalLayout: FC<ModalLayoutProps> = ({
    className,
    isVisible,
    hasIndentation,
    onClickOverlay,
    children,
    node,
    nodeId,
    colAlignment,
    rowAlignment,
    ...rest
}) => {
    if (!isVisible) return <></>;

    return createPortal(
        <div
            className={classNames(
                styles.ModalLayout,
                hasIndentation && styles.Indentation,
                colAlignment && colAlignmentStrategy[colAlignment],
                rowAlignment && rowAlignmentStrategy[rowAlignment]
            )}
            {...rest}>
            <div className={styles.Overlay} onClick={onClickOverlay} />

            <div className={classNames(styles.Content, className)}>
                {typeof children === 'function' ? children() : children}
            </div>
        </div>,
        node ?? (document.getElementById(nodeId ?? 'modal') as HTMLElement)
    );
};

export default memo(ModalLayout);
