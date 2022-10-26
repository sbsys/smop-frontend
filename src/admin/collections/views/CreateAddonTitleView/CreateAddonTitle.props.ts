/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
import { FieldSetProps } from 'admin/core';
/* types */
import { TitleCollection } from 'admin/collections/types';

export interface CreateAddonTitleContextProps {
    /* functions */
    handleCreateAddonTitle: (event?: BaseSyntheticEvent) => Promise<void>;
    handleCalcelCreateAddonTitle: () => void;
    /* props */
    createAddonTitleFieldProps: FieldSetProps[];
}

export interface CreateAddonTitleProviderProps extends ChildrenProps {
    context: CreateAddonTitleContextProps;
}

export interface CreateAddonTitleFormData {
    defaultTitle: string;
    titleCollection: TitleCollection[];
    multiLanguage: boolean;
}
