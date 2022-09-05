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
    text: memo(
        forwardRef<HTMLInputElement | null>((props, ref) => (
            <TextField inputMode="text" {...(props as FieldProps)} ref={ref} />
        ))
    ),
    password: memo(
        forwardRef<HTMLInputElement | null>((props, ref) => (
            <PasswordField inputMode="text" {...(props as PasswordFieldProps)} ref={ref} />
        ))
    ),
    email: memo(
        forwardRef<HTMLInputElement | null>((props, ref) => (
            <TextField inputMode="email" {...(props as FieldProps)} ref={ref} />
        ))
    ),
    number: memo(
        forwardRef<HTMLInputElement | null>((props, ref) => (
            <TextField inputMode="numeric" {...(props as FieldProps)} ref={ref} />
        ))
    ),
    decimal: memo(
        forwardRef<HTMLInputElement | null>((props, ref) => (
            <TextField inputMode="decimal" {...(props as FieldProps)} ref={ref} strategy="number" />
        ))
    ),
    radio: memo(
        forwardRef<HTMLInputElement | null>((props, ref) => <TextField {...(props as FieldProps)} ref={ref} />)
    ),
    checkbox: memo(
        forwardRef<HTMLInputElement | null>((props, ref) => <TextField {...(props as FieldProps)} ref={ref} />)
    ),
    file: memo(
        forwardRef<HTMLInputElement | null>((props, ref) => <FileField {...(props as FileFieldProps)} ref={ref} />)
    ),
    date: memo(forwardRef<HTMLInputElement | null>((props, ref) => <TextField {...(props as FieldProps)} ref={ref} />)),
    select: memo(
        forwardRef<HTMLSelectElement | null>((props, ref) => <SelectField {...(props as SelectFieldProps)} ref={ref} />)
    ),
    find_select: memo(
        forwardRef<HTMLInputElement | null>((props, ref) => <TextField {...(props as FieldProps)} ref={ref} />)
    ),
    find_modal: memo(
        forwardRef<HTMLInputElement | null>((props, ref) => <TextField {...(props as FieldProps)} ref={ref} />)
    ),
};

const FieldComponentStrategy = ComponentStrategy<FieldsProps, FieldStrategy>({
    components,
    Default: TextField,
});

const Field = forwardRef<HTMLInputElement | HTMLSelectElement | null, StrategyProps<FieldsProps, FieldStrategy>>(
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
