import { lazy } from 'react';

const CommerceMenuView = lazy(() => import('./CommerceMenu.view'));

export { CommerceMenuView };

export * from './CommerceMenu.context';
