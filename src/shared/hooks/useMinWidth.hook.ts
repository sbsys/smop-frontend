/* react */
import { MutableRefObject, useEffect, useRef, useState } from 'react';
/* values */
import { BreakPointValue } from 'shared/values';
/* types */
import { BreakPoint } from 'shared/types';

export const useMinWidth = (): [
    BreakPoint | '',
    MutableRefObject<HTMLDivElement | null>
] => {
    const ref = useRef<HTMLDivElement | null>(null);

    const mediaRef = useRef<BreakPoint | ''>('');

    const [breakPoint, setBreakPoint] = useState<BreakPoint | ''>('');

    useEffect(() => {
        mediaRef.current = breakPoint;
    }, [breakPoint]);

    useEffect(() => {
        const hasNoRef = !ref.current;

        const mediaQueries: MediaQueryList[] = [];

        const setMatchMedia: (
            bp: BreakPoint
        ) => (event: MediaQueryList | MediaQueryListEvent) => void =
            (bp: BreakPoint) =>
            (event: MediaQueryList | MediaQueryListEvent) => {
                if (event.matches) {
                    setBreakPoint(bp);

                    return;
                }

                const BreakPointKeys = Object.keys(BreakPointValue);

                const currentIndex = BreakPointKeys.findIndex(
                    bpk => bpk === mediaRef.current
                );
                const matchMediaIndex = BreakPointKeys.findIndex(
                    bpk => bpk === bp
                );

                if (
                    matchMediaIndex <= currentIndex &&
                    matchMediaIndex - 1 > -1
                ) {
                    setBreakPoint(
                        BreakPointKeys[matchMediaIndex - 1] as BreakPoint
                    );
                }
            };

        if (hasNoRef) {
            Object.keys(BreakPointValue).forEach(bpk => {
                const currentMedia: MediaQueryList = window.matchMedia(
                    `(min-width: ${BreakPointValue[bpk as BreakPoint]}px)`
                );

                mediaQueries.push(currentMedia);

                setMatchMedia(bpk as BreakPoint)(currentMedia);

                currentMedia.addEventListener(
                    'change',
                    setMatchMedia(bpk as BreakPoint)
                );
            });
        }

        return () => {
            if (hasNoRef) {
                Object.keys(BreakPointValue).forEach((bpk, index) => {
                    mediaQueries[index].removeEventListener(
                        'change',
                        setMatchMedia(bpk as BreakPoint)
                    );
                });
            }
        };
    }, []);

    return [breakPoint, ref];
};
