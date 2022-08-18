/* react */
import { FC, memo } from 'react';
/* props */
import { ButtonProps } from './Button.props';

const Button: FC<ButtonProps> = ({ children, ...rest }) => {
    return (
        <button {...rest}>
            {typeof children === 'function' ? children() : children}
        </button>
    );
};

export default memo(Button);
