/* react */
import { MutableRefObject, useEffect, useRef } from 'react';

export const useClickOutside = (
    handleClickOutside?: () => void
): [MutableRefObject<HTMLDivElement | null>] => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ref.current || typeof handleClickOutside !== 'function') return;

        const handleClick: (event: MouseEvent) => void = (event: MouseEvent) =>
            !ref.current?.contains(event.target as Node) &&
            handleClickOutside();

        document.addEventListener('mousedown', handleClick);

        return () => document.removeEventListener('mousedown', handleClick);
    }, [ref, handleClickOutside]);

    return [ref];
};
