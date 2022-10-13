/* react */
import { useCallback, useEffect, useState } from 'react';
/* utils */
import { offCustomEvent, onCustomEvent, triggerCustomEvent } from 'shared/utils';

export const useLocalStorage = <T = any>(
    key: string,
    initialValue: T
): [T, (value: ((stored: T) => T) | T) => void, () => void] => {
    /* states */

    const [storedValue, setStoredValue] = useState<T>(() => {
        if (!window) return initialValue;

        try {
            const item = window.localStorage.getItem(key);

            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    /* functions */

    const setValue = useCallback(
        (value: ((stored: T) => T) | T) => {
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value;

                setStoredValue(valueToStore);

                if (typeof window !== 'undefined') window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                throw new Error('NO_LOCALSTORAGE');
            }
        },
        [key, storedValue]
    );

    const clear = useCallback(() => {
        try {
            window.localStorage.removeItem(key);
            triggerCustomEvent(`localStorage.${key}`);
        } catch (error) {
            throw new Error('NO_LOCALSTORAGE');
        }
    }, [key]);

    useEffect(() => {
        const onRemoveLocalStorageItem = () => setStoredValue(initialValue);
        const eventName = `localStorage.${key}`;

        onCustomEvent(eventName, onRemoveLocalStorageItem);

        return () => offCustomEvent(eventName, onRemoveLocalStorageItem);
    }, [initialValue, key]);

    return [storedValue, setValue, clear];
};
