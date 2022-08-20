/* react */
import { ReactNode, useEffect } from 'react';
/* hooks */
import { useActive } from './useActive.hook';

interface UseLoaderProps {
    loader?: ReactNode;
}

export const useLoader = ({ loader }: UseLoaderProps) => {
    const [isLoader, showLoader, hideLoader] = useActive();

    useEffect(() => {
        if (!loader) return;
    }, [loader]);
};
