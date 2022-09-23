import { SignInDTO } from '../types';

export const signInSerializer = (data: any): SignInDTO => {
    return {
        token: data.token,
        user: {
            id: data.user.userId,
            email: data.user.email,
            name: data.user.fullname,
            phone: data.user.phoneNumber,
            isActive: data.user.isActive,
            profiles: data.user.profiles,
        },
    };
};
