import { triggerCustomEvent } from 'shared/utils';

export const triggerResetPasswordService = () => triggerCustomEvent('reset_password');
