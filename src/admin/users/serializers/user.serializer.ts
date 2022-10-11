import { UserListItemDTO } from '../types';

export const userListItemSerializer = (data: any): UserListItemDTO => ({
    ...data,
    isActive: data.isActive ? 'active' : 'inactive',
    createdAt: new Date(data.createdAt),
});

export const userListSerializer = (data: any): UserListItemDTO[] =>
    data.accounts.map((item: any) => userListItemSerializer(item));
