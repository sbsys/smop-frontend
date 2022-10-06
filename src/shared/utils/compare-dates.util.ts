import { isAfter, isBefore, isEqual } from 'date-fns';

export const isAfterOrEqual = (evaluate: Date, base: Date) => isAfter(evaluate, base) || isEqual(evaluate, base);

export const isBeforeOrEqual = (evaluate: Date, base: Date) => isBefore(evaluate, base) || isEqual(evaluate, base);
