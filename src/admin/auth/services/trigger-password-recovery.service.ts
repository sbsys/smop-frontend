import { triggerCustomEvent } from 'shared/utils';

export const triggerPasswordRecoveryService = () => triggerCustomEvent('password_recovery');
