import { UserListItemDTO } from '../types';

export const userListItemSerializer = (data: any): UserListItemDTO => {
    return {
        ...data,
        isActive: data.isActive ? 'active' : 'inactive',
        createdAt: new Date(data.createdAt),
        profileName: data.profileName === '-' ? '' : data.profileName,
        commerceId: data.commerceId ?? '',
    };
};

export const userListSerializer = (data: any): UserListItemDTO[] =>
    data.accounts.map((item: any) => userListItemSerializer(item));
