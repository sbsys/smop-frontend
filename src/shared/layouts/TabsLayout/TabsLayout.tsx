/* react */
import { forwardRef, Fragment, memo, useCallback, useImperativeHandle, useMemo, useState } from 'react';
/* props */
import { TabsLayoutProps, TabsLayoutRef } from './TabsLayout.props';
/* layouts */
import { PanelLayout } from '../PanelLayout';
import { ScrollLayout } from '../ScrollLayout';
/* utils */
import { classNames } from 'shared/utils';
/* styles */
import styles from './TabsLayout.module.scss';

const TabsLayout = forwardRef<TabsLayoutRef | null, TabsLayoutProps>(({ className, classNameHeader, tabs }, ref) => {
    /* states */
    const [tabIndex, setTabIndex] = useState<number>(0);

    const hasHeader = useMemo((): boolean => tabs.find(tab => tab.header !== undefined) !== undefined, [tabs]);

    /* functions */
    const nextTab = useCallback(
        () => setTabIndex(index => (index + 1 <= tabs.length ? index + 1 : index)),
        [tabs.length]
    );

    const prevTab = useCallback(() => setTabIndex(index => (index - 1 >= 0 ? index - 1 : index)), []);

    useImperativeHandle(
        ref,
        () => ({
            currentTabIndex: tabIndex,
            setTabIndex: setTabIndex,
            nextTab: nextTab,
            prevTab: prevTab,
        }),
        [nextTab, prevTab, tabIndex]
    );

    return (
        <PanelLayout orientation="col" className={classNames(styles.TabsLayout, className)}>
            {hasHeader && (
                <div className={styles.Header}>
                    <ScrollLayout orientation="row" classNameContent={classNameHeader}>
                        {tabs.map((tab, index) => (
                            <Fragment key={index}>
                                {typeof tab.header === 'function'
                                    ? tab.header({
                                          isCurrentTab: tabIndex === index,
                                          setCurrentTab: () => setTabIndex(index),
                                          currentTabIndex: tabIndex,
                                      })
                                    : tab.header}
                            </Fragment>
                        ))}
                    </ScrollLayout>
                </div>
            )}

            {tabs.map((tab, index) => (
                <PanelLayout key={index} className={classNames(styles.Tab, tabIndex === index && styles.TabActive)}>
                    {typeof tab.body === 'function'
                        ? tab.body({
                              isCurrentTab: tabIndex === index,
                              setCurrentTab: () => setTabIndex(index),
                              currentTabIndex: tabIndex,
                          })
                        : tab.body}
                </PanelLayout>
            ))}
        </PanelLayout>
    );
});

export default memo(TabsLayout);
