/* react */
import { FC, memo } from 'react';
/* props */
import { BadgeProps } from './Badge.props';
/* components */
import { Button } from 'shared/components';
/* utils */
import { classNames } from 'shared/utils';
/* assets */
import { MdClose } from 'react-icons/md';
/* styles */
import styles from './Badge.module.scss';

const Badge: FC<BadgeProps> = ({ className, onRemove, children }) => {
    return (
        <span className={classNames(styles.Badge, className)}>
            <span>{typeof children === 'function' ? children() : children}</span>

            <Button type="button" onClick={onRemove}>
                <i>
                    <MdClose />
                </i>
            </Button>
        </span>
    );
};

export default memo(Badge);
