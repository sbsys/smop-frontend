/* react */
import { FC, memo } from 'react';
/* props */
import { FieldLayoutProps } from './Field.props';

const FieldLayout: FC<FieldLayoutProps> = ({ beforeContent, afterContent, children, ...rest }) => {
    return (
        <label {...rest}>
            {typeof beforeContent === 'function' ? beforeContent() : beforeContent}

            {typeof children === 'function' ? children() : children}

            {typeof afterContent === 'function' ? afterContent() : afterContent}
        </label>
    );
};

export default memo(FieldLayout);
