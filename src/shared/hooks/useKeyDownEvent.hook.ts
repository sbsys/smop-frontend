import { useEffect } from 'react';

export const useKeyDownEvent = (
    handleKeyDownEvent: (event: KeyboardEvent) => void
) => {
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDownEvent);

        return () =>
            document.removeEventListener('keydown', handleKeyDownEvent);
    }, [handleKeyDownEvent]);
};
