import { ReactNode } from 'react';

export interface TabProps {
    isCurrentTab: boolean;
    setCurrentTab: () => void;
    currentTabIndex: number;
}

export interface Tab {
    header?: ReactNode | ((props: TabProps) => ReactNode);
    body?: ReactNode | ((props: TabProps) => ReactNode);
}

export interface TabsLayoutProps {
    tabs: Tab[];
    className?: string;
    classNameHeader?: string;
}

export interface TabsLayoutRef {
    currentTabIndex: number;
    setTabIndex: (index: number) => void;
    nextTab: () => void;
    prevTab: () => void;
}
