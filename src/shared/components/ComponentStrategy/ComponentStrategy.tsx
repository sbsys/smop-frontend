/* react */
import { forwardRef, memo } from 'react';
/* props */
import {
    ComponentStrategyProps,
    StrategyProps,
} from './ComponentStrategy.props';

const ComponentStrategy = <PROPS extends object, STRATEGY>({
    components,
    Default,
}: ComponentStrategyProps<PROPS, STRATEGY>) => {
    /* component strategy */
    const Strategy = forwardRef<any, StrategyProps<PROPS, STRATEGY>>(
        (props, ref) => {
            const Component = props.strategy
                ? components[props.strategy as unknown as string]
                : Default;

            return <Component ref={ref} {...props} />;
        }
    );

    return memo(Strategy);
};

export default ComponentStrategy;
