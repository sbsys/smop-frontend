/* types */
import { Profile } from 'admin/auth';

export type UserState = 'active' | 'inactive';

export interface UserListItemDTO {
    userId: string;
    fullname: string;
    email: string;
    phoneNumber: string;
    isActive: UserState;
    createdAt: Date;
    schemaName: string;
    profileName: Profile;
    commerceId: string;
}
