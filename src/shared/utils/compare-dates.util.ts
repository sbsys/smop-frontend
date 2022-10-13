import { addDays, isAfter, isBefore, isEqual, subSeconds } from 'date-fns';

export const isAfterOrEqual = (evaluate: Date, base: Date) => isAfter(evaluate, base) || isEqual(evaluate, base);

export const isBeforeOrEqual = (evaluate: Date, base: Date) => {
    let newBase = addDays(base, 1);
    newBase = subSeconds(newBase, 1);

    return isBefore(evaluate, newBase) || isEqual(evaluate, newBase);
};
