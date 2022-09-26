/* react */
import {
    DetailedHTMLProps,
    forwardRef,
    InputHTMLAttributes,
    LabelHTMLAttributes,
    memo,
} from 'react';
/* props */
import { FieldLayoutProps, FileFieldProps } from './Field.props';
/* layouts */
import FieldLayout from './FieldLayout';
/* utils */
import { classNames } from 'shared/utils';
/* styles */
import styles from './Field.module.scss';

const FileField = forwardRef<HTMLInputElement | null, FileFieldProps>(
    (
        {
            className,
            classNameContent,
            beforeContent,
            afterContent,
            children,
            onDragEnter,
            onDragOver,
            onDragLeave,
            onDrop,
            ...rest
        },
        ref
    ) => {
        const layoutProps: FieldLayoutProps = {
            className,
            beforeContent,
            afterContent,
        };

        const labelProps: DetailedHTMLProps<
            LabelHTMLAttributes<HTMLLabelElement>,
            HTMLLabelElement
        > = {
            className: styles.FileLabel,
            htmlFor: rest.id || rest.name,
            onDragEnter,
            onDragOver,
            onDragLeave,
            onDrop,
        };

        const inputProps: DetailedHTMLProps<
            InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        > = {
            className: classNames(styles.TextField, classNameContent),
            type: 'file',
            id: rest.name,
            ref,
            ...rest,
        };

        return (
            <FieldLayout {...layoutProps}>
                <span {...labelProps}>
                    {typeof children === 'function' ? children() : children}
                </span>

                <input {...inputProps} />
            </FieldLayout>
        );
    }
);

export default memo(FileField);
