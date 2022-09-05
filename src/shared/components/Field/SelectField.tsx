/* react */
import { DetailedHTMLProps, forwardRef, memo, SelectHTMLAttributes } from 'react';
/* props */
import { FieldLayoutProps, SelectFieldProps } from './Field.props';
/* layouts */
import FieldLayout from './FieldLayout';
/* styles */
import styles from './Field.module.scss';
import { classNames } from 'shared/utils';

const SelectField = forwardRef<HTMLSelectElement | null, SelectFieldProps>(
    ({ className, beforeContent, afterContent, classNameContent, placeholder, options, ...rest }, ref) => {
        const layoutProps: FieldLayoutProps = {
            className,
            beforeContent,
            afterContent,
        };

        const selectProps: DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> = {
            className: classNames(styles.TextField, classNameContent),
            ref,
            ...rest,
        };

        return (
            <FieldLayout {...layoutProps}>
                <select {...selectProps}>
                    <option hidden value="">
                        {placeholder}
                    </option>

                    {options?.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </FieldLayout>
        );
    }
);

export default memo(SelectField);
