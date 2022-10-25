/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
import { FieldSetProps } from 'admin/core';
/* types */
import { TitleCollection } from 'admin/collections/types';

export interface CreateMainTitleContextProps {
    /* functions */
    handleCreateMainTitle: (event?: BaseSyntheticEvent) => Promise<void>;
    handleCalcelCreateMainTitle: () => void;
    /* props */
    createMainTitleFieldProps: FieldSetProps[];
}

export interface CreateMainTitleProviderProps extends ChildrenProps {
    context: CreateMainTitleContextProps;
}

export interface CreateMainTitleFormData {
    defaultTitle: string;
    titleCollection: TitleCollection[];
    multiLanguage: boolean;
}
