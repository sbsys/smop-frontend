/* react */
import { FC, memo, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { initReactI18next, useTranslation } from 'react-i18next';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Provider } from 'react-redux';
/* routes */
import AppRoutes from './App.routes';
/* components */
import { Loader, Notification, NotificationElement } from 'shared/components';
import { AdminLoader, AdminNotification, AdminNotify, AdminNotifyProps, adminStore, langs } from './core';
/* utils */
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
/* styles */
import './App.scss';

/* setup language */
i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        detection: {
            order: ['localStorage'],
            lookupLocalStorage: 'admin_lang',
            caches: ['localStorage'],
        },
        resources: langs,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

const AdminApp: FC = () => {
    const { i18n } = useTranslation('global');

    return (
        <HelmetProvider>
            <Helmet>
                <html lang={i18n.language} />
            </Helmet>

            <BrowserRouter basename="">
                <Suspense fallback={<span>Loading...</span>}>
                    <Provider store={adminStore}>
                        <Notification
                            duration={8000}
                            element={
                                <AdminNotification rowAlignment="start" colAlignment="end" direction="bottom-top">
                                    {props => <AdminNotify {...(props as NotificationElement<AdminNotifyProps>)} />}
                                </AdminNotification>
                            }>
                            <Loader element={<AdminLoader />}>
                                <AppRoutes />
                            </Loader>
                        </Notification>
                    </Provider>
                </Suspense>
            </BrowserRouter>
        </HelmetProvider>
    );
};

export default memo(AdminApp);
