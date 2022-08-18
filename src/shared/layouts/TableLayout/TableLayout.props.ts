/* react */
import { DetailedHTMLProps, TableHTMLAttributes } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';

export interface TableColumn extends ChildrenProps {
    span?: number;
}

export interface TableRow {
    span?: number;
    columns?: TableColumn[];
}

export interface TableLayoutProps extends DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> {
    header?: TableRow;
    body?: TableRow[];
}
