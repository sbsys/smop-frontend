/* react */
import { FC, memo } from 'react';
/* props */
import { FieldSetProps } from './FieldSet.props';
/* components */
import { Field, Legend } from 'shared/components';
/* utils */
import { classNames } from 'shared/utils';
/* styles */
import styles from './FieldSet.module.scss';

const FieldSet: FC<FieldSetProps> = ({ className, field, hint, isHintReserved, ...rest }) => {
    return (
        <fieldset
            className={classNames(styles.FieldSet, !hint && isHintReserved && styles.HintReserved, className)}
            {...rest}>
            <Field {...field} />

            {hint && <Legend {...hint} />}
        </fieldset>
    );
};

export default memo(FieldSet);
