/* react */
import { useState } from 'react';

export const useActive = (
    defaultState: boolean = false
): [boolean, () => void, () => void, () => void] => {
    /* states */
    const [isActive, setIsActive] = useState<boolean>(defaultState);

    const activate = () => setIsActive(true);

    const deactivate = () => setIsActive(false);

    const toggle = () => setIsActive(value => !value);

    return [isActive, activate, deactivate, toggle];
};
