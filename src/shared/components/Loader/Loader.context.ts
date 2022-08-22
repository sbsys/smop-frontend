/* react */
import { createContext } from 'react';
/* props */
import { LoaderContextProps } from './Loader.props';

export const LoaderContext = createContext<LoaderContextProps>({
    isLoading: false,
    showLoader: () => {},
    hideLoader: () => {},
});
