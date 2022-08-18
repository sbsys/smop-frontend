/* react */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
/* apps */
import { AdminApp } from 'admin';
/* utils */
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
/* styles */
import './index.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <AdminApp />
    </StrictMode>
);

serviceWorkerRegistration.unregister();
reportWebVitals();
