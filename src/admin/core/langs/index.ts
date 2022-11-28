import { en } from './en.lang';
import enPrev from './en.lang.json'
import { es } from './es.lang';
import esPrev from './es.lang.json'

export const langs = {
    en: { translation: { ...en, ...enPrev } },
    es: { translation: { ...es, ...esPrev } },
};
