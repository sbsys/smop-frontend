/* react */
import { FC } from 'react';

export interface ComponentStrategyProps<PROPS = null, STRATEGY = string> {
    components: Record<string, FC<PROPS>>;

    Default: FC<(PROPS & { strategy?: STRATEGY }) | any>;
}

export type StrategyProps<PROPS = null, STRATEGY = string> = {
    strategy?: STRATEGY;
} & {
    [key in keyof PROPS]: PROPS[key];
};
