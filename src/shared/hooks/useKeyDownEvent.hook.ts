import { useEffect } from 'react';

export const useKeyDownEvent = (handleKeyDownEvent: (event: KeyboardEvent) => void) => {
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDownEvent);

        return () => document.removeEventListener('keydown', handleKeyDownEvent);
    }, [handleKeyDownEvent]);
};

export const useWheelEvent = (handleWheelEvent: (event: WheelEvent) => void) => {
    useEffect(() => {
        document.addEventListener('wheel', handleWheelEvent);

        return () => document.removeEventListener('wheel', handleWheelEvent);
    }, [handleWheelEvent]);
};
