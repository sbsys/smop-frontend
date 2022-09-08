import { SignInDTO } from '../types';

export const signInSerializer = (data: any): SignInDTO => {
    return {
        token: data.token,
        user: {
            id: data.user.user_id,
            email: data.user.email,
            name: data.user.fullname,
            phone: data.user.phone_number,
            isActive: data.user.isActive,
            profiles: data.user.profiles,
        },
    };
};
