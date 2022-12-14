import { lazy } from 'react';

const CommerceManagementView = lazy(() => import('./CommerceManagement.view'));

export { CommerceManagementView };

export * from './CommerceManagement.context';
