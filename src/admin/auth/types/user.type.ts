export type Profile = 'root' | 'admin' | 'manager' | 'auxiliar' | 'cashier' | 'waiter';

export const ProfileValue: { id: number; profile: Profile }[] = [
    {
        id: 0,
        profile: 'root',
    },
    {
        id: 1,
        profile: 'admin',
    },
    {
        id: 2,
        profile: 'manager',
    },
    {
        id: 3,
        profile: 'auxiliar',
    },
    {
        id: 4,
        profile: 'cashier',
    },
    {
        id: 5,
        profile: 'waiter',
    },
];

export interface UserDTO {
    id: string;
    email: string;
    name: string;
    isActive: boolean;
    phone: string;
    profiles: Profile;
}

export interface SignInDTO {
    token: string;
    user: UserDTO;
}
