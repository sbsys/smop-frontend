/* react */
import { FC, memo, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { initReactI18next, useTranslation } from 'react-i18next';
import { HelmetProvider, Helmet } from 'react-helmet-async';
/* routes */
import AppRoutes from './App.routes';
/* components */
import { Loader } from 'shared/components';
import { AdminLoader, langs } from './core';
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
            lookupLocalStorage: 'i18nextLng',
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

            <BrowserRouter basename="admin">
                <Suspense fallback={<span>Loading...</span>}>
                    <Loader element={<AdminLoader />}>
                        <AppRoutes />
                    </Loader>
                </Suspense>
            </BrowserRouter>
        </HelmetProvider>
    );
};

export default memo(AdminApp);
