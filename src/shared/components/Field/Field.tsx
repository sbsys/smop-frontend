/* react */
import { FC, forwardRef, memo } from 'react';
/* props */
import {
    FieldProps,
    FieldsProps,
    FieldStrategy,
    FileFieldProps,
    PasswordFieldProps,
    SelectFieldProps,
} from './Field.props';
/* components */
import TextField from './TextField';
import PasswordField from './PasswordField';
import FileField from './FileField';
import SelectField from './SelectField';
/* strategy */
import { ComponentStrategy, StrategyProps } from '../ComponentStrategy';
/* utils */
import { classNames } from 'shared/utils';
/* styles */
import styles from './Field.module.scss';

const components: Record<FieldStrategy, FC<FieldsProps>> = {
    text: memo(props => <TextField inputMode="text" {...(props as FieldProps)} />),
    password: memo(props => <PasswordField inputMode="text" {...(props as PasswordFieldProps)} />),
    email: memo(props => <TextField inputMode="email" {...(props as PasswordFieldProps)} />),
    number: memo(props => <TextField inputMode="numeric" {...(props as FieldProps)} />),
    decimal: memo(props => <TextField inputMode="decimal" {...(props as FieldProps)} strategy="number" />),
    radio: memo(props => <TextField {...(props as PasswordFieldProps)} />),
    checkbox: memo(props => <TextField {...(props as PasswordFieldProps)} />),
    file: memo(props => <FileField {...(props as FileFieldProps)} />),
    date: memo(props => <TextField {...(props as PasswordFieldProps)} />),
    select: memo(props => <SelectField {...(props as SelectFieldProps)} />),
    find_select: memo(props => <TextField {...(props as PasswordFieldProps)} />),
    find_modal: memo(props => <TextField {...(props as PasswordFieldProps)} />),
};

const FieldComponentStrategy = ComponentStrategy<FieldsProps, FieldStrategy>({
    components,
    Default: TextField,
});

const Field = forwardRef<HTMLInputElement | null, StrategyProps<FieldsProps, FieldStrategy>>(
    ({ className, ...rest }, ref) => {
        const props: FieldsProps = {
            className: classNames(styles.Field, className),
            autoComplete: 'off',
            ...rest,
        };

        return <FieldComponentStrategy ref={ref} {...props} />;
    }
);

export default memo(Field);
