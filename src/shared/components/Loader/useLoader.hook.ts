/* props */
import { LoaderContextProps } from './Loader.props';
/* hooks */
import { useActive } from 'shared/hooks';

export const useLoader = () => {
    /* states */
    const [isLoading, showLoader, hideLoader] = useActive();

    /* context */
    const context: LoaderContextProps = {
        isLoading,
        showLoader,
        hideLoader,
    };

    return { context };
};
