/* react */
import {
    DetailedHTMLProps,
    forwardRef,
    InputHTMLAttributes,
    memo,
} from 'react';
/* props */
import { FieldLayoutProps, FieldProps } from './Field.props';
/* layouts */
import FieldLayout from './FieldLayout';
/* utils */
import { classNames } from 'shared/utils';
/* styles */
import styles from './Field.module.scss';

const TextField = forwardRef<HTMLInputElement | null, FieldProps>(
    (
        {
            className,
            classNameContent,
            beforeContent,
            afterContent,
            strategy,
            ...rest
        },
        ref
    ) => {
        /* props */

        const layoutProps: FieldLayoutProps = {
            className,
            beforeContent,
            afterContent,
        };

        const inputProps: DetailedHTMLProps<
            InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        > = {
            className: classNames(styles.TextField, classNameContent),
            type: strategy,
            ref,
            ...rest,
        };

        return (
            <FieldLayout {...layoutProps}>
                <input {...inputProps} />
            </FieldLayout>
        );
    }
);

export default memo(TextField);
