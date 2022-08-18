/* types */
import { BreakPoint } from 'shared/types';
/* values */
import { BreakPointValue } from 'shared/values';

const BreakPointKeys = Object.keys(BreakPointValue);

export const matchBreakPoint = (match: BreakPoint, current: BreakPoint) => {
    const matchIndex = BreakPointKeys.findIndex(bpk => bpk === match);
    const currentIndex = BreakPointKeys.findIndex(bpk => bpk === current);

    return {
        on: currentIndex >= matchIndex,
        in: currentIndex === matchIndex,
        under: currentIndex < matchIndex,
    };
};
