/* react */
import { DetailedHTMLProps, forwardRef, memo, TextareaHTMLAttributes } from 'react';
/* props */
import { AreaProps, FieldLayoutProps } from './Field.props';
/* layouts */
import FieldLayout from './FieldLayout';
/* utils */
import { classNames } from 'shared/utils';
/* styles */
import styles from './Field.module.scss';

const AreaField = forwardRef<HTMLTextAreaElement | null, AreaProps>(
    ({ className, classNameContent, beforeContent, afterContent, ...rest }, ref) => {
        /* props */

        const layoutProps: FieldLayoutProps = {
            className,
            beforeContent,
            afterContent,
        };

        const inputProps: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> = {
            className: classNames(styles.TextField, classNameContent),
            ref,
            ...rest,
        };

        return (
            <FieldLayout {...layoutProps}>
                <textarea {...inputProps} />
            </FieldLayout>
        );
    }
);

export default memo(AreaField);
