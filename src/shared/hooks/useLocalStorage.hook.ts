/* react */
import { useState } from 'react';

export const useLocalStorage = <T = any>(key: string, initialValue: T) => {
    /* states */

    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') return initialValue;

        try {
            const item = window.localStorage.getItem(key);

            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    /* functions */

    const setValue = (value: T) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            if (typeof window !== 'undefined')
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            throw new Error('NO_LOCALSTORAGE');
        }
    };

    return [storedValue, setValue];
};
