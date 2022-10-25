/* react */
import { useTranslation } from 'react-i18next';

export type Lang = 'en' | 'es';

export interface LangProps {
    lang: Lang;
    language: string;
}

export const availableLangs: Record<Lang, LangProps> = {
    en: {
        lang: 'en',
        language: 'English',
    },
    es: {
        lang: 'es',
        language: 'Español',
    },
};

export const useAdminLang = () => {
    const { i18n } = useTranslation();

    const changeLang = (lang: Lang) => i18n.changeLanguage(lang);

    return {
        lang: i18n.language,
        availableLangs,
        changeLang,
    };
};
