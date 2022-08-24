/* react */
import { FC, memo } from 'react';
/* props */
import { LoaderContextProps, LoaderProps } from './Loader.props';
/* context */
import { LoaderContext } from './Loader.context';
/* custom hook */
import { useLoader } from './useLoader.hook';

const Loader: FC<LoaderProps<LoaderContextProps>> = ({ element, children }) => {
    const { context } = useLoader();

    return (
        <LoaderContext.Provider value={context}>
            {typeof children === 'function' ? children(context) : children}

            {typeof element === 'function' ? element(context) : element}
        </LoaderContext.Provider>
    );
};

export default memo(Loader);
