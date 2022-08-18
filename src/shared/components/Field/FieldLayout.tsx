/* react */
import { FC, memo } from 'react';
/* props */
import { FieldLayoutProps } from './Field.props';

const FieldLayout: FC<FieldLayoutProps> = ({
    beforeContent,
    afterContent,
    children,
    ...rest
}) => {
    return (
        <div {...rest}>
            {typeof beforeContent === 'function'
                ? beforeContent()
                : beforeContent}

            {typeof children === 'function' ? children() : children}

            {typeof afterContent === 'function' ? afterContent() : afterContent}
        </div>
    );
};

export default memo(FieldLayout);
