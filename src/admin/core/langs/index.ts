import { en } from './en.lang';
import es from './es.lang.json';
import enPrev from './en.lang.json';

export const langs = {
    en: { translation: { ...enPrev, ...en } },
    es: { translation: { ...es } },
};
