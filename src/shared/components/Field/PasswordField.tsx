/* react */
import {
    DetailedHTMLProps,
    forwardRef,
    InputHTMLAttributes,
    memo,
} from 'react';
/* props */
import { FieldLayoutProps, PasswordFieldProps } from './Field.props';
/* layouts */
import FieldLayout from './FieldLayout';
/* utils */
import { classNames } from 'shared/utils';
/* styles */
import styles from './Field.module.scss';

const PasswordField = forwardRef<HTMLInputElement | null, PasswordFieldProps>(
    (
        {
            className,
            beforeContent,
            afterContent,
            classNameContent,
            classNameIcon,
            isPasswordVisible,
            onShowPassword,
            onHidePassword,
            showIcon,
            hideIcon,
            strategy,
            ...rest
        },
        ref
    ) => {
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
            type: isPasswordVisible ? 'text' : strategy,
            ref,
            ...rest,
        };

        const iconProps = {
            className: classNames(styles.PasswordIcon, classNameIcon),
            onClick: isPasswordVisible ? onHidePassword : onShowPassword,
            children: isPasswordVisible
                ? typeof hideIcon === 'function'
                    ? hideIcon()
                    : hideIcon ?? 'Hide'
                : typeof showIcon === 'function'
                ? showIcon()
                : showIcon ?? 'Show',
        };

        return (
            <FieldLayout {...layoutProps}>
                <input {...inputProps} />

                <i {...iconProps} />
            </FieldLayout>
        );
    }
);

export default memo(PasswordField);
