export type Profile = 'superuser' | 'admin';

export interface UserDTO {
    id: string;
    email: string;
    name: string;
    isActive: boolean;
    phone: string;
    profiles: Profile[];
}

export interface SignInDTO {
    token: string;
    user: UserDTO;
}
