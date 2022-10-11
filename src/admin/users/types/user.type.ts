/* types */
import { Profile } from 'admin/auth';

export type UserState = 'active' | 'inactive';

export interface UserListItemDTO {
    id: string;
    fullname: string;
    email: string;
    phoneNumber: string;
    isActive: UserState;
    createdAt: Date;
    schemaName: string;
    profileName: Profile;
}
