import { ReactNode } from 'react';
import { ChildrenProps } from 'shared/props';

export interface LoaderProps<T> extends ChildrenProps<T> {
    element?: ReactNode | ReactNode[] | ((params: T) => ReactNode);
}

export interface LoaderContextProps {
    isLoading: boolean;
    showLoader: () => void;
    hideLoader: () => void;
}
