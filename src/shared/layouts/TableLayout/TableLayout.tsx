/* react */
import { FC, Fragment, memo } from 'react';
/* props */
import { TableLayoutProps, TableRow } from './TableLayout.props';
/* utils */
import { classNames } from 'shared/utils';
/* styles */
import { PanelLayoutStyles } from '../PanelLayout';
import { ScrollLayoutStyles } from '../ScrollLayout';
import styles from './TableLayout.module.scss';

type TableFrom = 'header' | 'body';

const headerColumnSpan = (cIndex: number, header?: TableRow): number => {
    if (!header || !Array.isArray(header.columns) || header.columns.length === 0) return 1;

    if (!header.columns[cIndex]) return 1;

    if (typeof header.columns[cIndex].span !== 'number') return 1;

    if ((header.columns[cIndex].span ?? 0) <= 0) return 0;

    return header.columns[cIndex].span ?? 0;
};

const bodyColumnSpan = (rIndex: number, cIndex: number, header?: TableRow, body?: TableRow[]): number => {
    if (!Array.isArray(body) || body.length === 0) return headerColumnSpan(cIndex, header);

    if (!body[rIndex] || !Array.isArray(body[rIndex].columns) || body[rIndex].columns?.length === 0)
        return headerColumnSpan(cIndex, header);

    if (!(body[rIndex].columns ?? [])[cIndex]) return headerColumnSpan(cIndex, header);

    if (typeof (body[rIndex].columns ?? [])[cIndex].span !== 'number') return headerColumnSpan(cIndex, header);

    if (((body[rIndex].columns ?? [])[cIndex].span ?? 0) <= 0) return 0;

    return (body[rIndex].columns ?? [])[cIndex].span ?? 0;
};

const TableLayout: FC<TableLayoutProps> = ({ className, header, body, ...rest }) => {
    const columnSpan = (rIndex: number, cIndex: number, from: TableFrom): number => {
        switch (from) {
            case 'header':
                return headerColumnSpan(cIndex, header);

            case 'body':
            default:
                return bodyColumnSpan(rIndex, cIndex, header, body);
        }
    };

    const tableColumns =
        header && Array.isArray(header.columns) && header.columns.length > 0
            ? header.columns.reduce((prev, _, index) => prev + columnSpan(0, index, 'header'), 0)
            : body && Array.isArray(body) && body.length > 0
            ? body.reduce((prev, currentRow, rIndex) => {
                  if (!currentRow.columns || !Array.isArray(currentRow.columns) || currentRow.columns.length === 0)
                      return prev;

                  const currentRowcolumnSpan = currentRow.columns.reduce(
                      (cPrev, _, cIndex) => cPrev + columnSpan(rIndex, cIndex, 'body'),
                      0
                  );

                  if (currentRowcolumnSpan <= prev) return prev;

                  return currentRowcolumnSpan;
              }, 0)
            : 1;

    const headerHasChildren =
        typeof header?.columns?.find(column => typeof column.children !== 'undefined') !== 'undefined';

    return (
        <table
            className={classNames(styles.Table, PanelLayoutStyles.PanelLayout, PanelLayoutStyles.Col, className)}
            {...rest}>
            {header && Array.isArray(header.columns) && header.columns.length > 0 && headerHasChildren && (
                <thead>
                    <tr
                        style={{
                            gridTemplateColumns: `repeat(${tableColumns}, 1fr)`,
                        }}>
                        {header.columns.map((item, index) => (
                            <Fragment key={index}>
                                {columnSpan(0, index, 'header') > 0 && (
                                    <th
                                        style={{
                                            gridColumn: `span ${columnSpan(0, index, 'header')}`,
                                        }}>
                                        {typeof item.children === 'function' ? item.children() : item.children}
                                    </th>
                                )}
                            </Fragment>
                        ))}
                    </tr>
                </thead>
            )}

            {Array.isArray(body) && body.length > 0 && (
                <tbody className={classNames(ScrollLayoutStyles.ScrollLayout, ScrollLayoutStyles.Col)}>
                    {body.map((row, rIndex) => (
                        <tr
                            key={rIndex}
                            style={{
                                gridTemplateColumns: `repeat(${tableColumns}, 1fr)`,
                            }}>
                            {Array.isArray(row.columns) &&
                                row.columns.length > 0 &&
                                row.columns.map((column, cIndex) => (
                                    <td
                                        key={`${rIndex}_${cIndex}`}
                                        style={{
                                            gridColumn: `span ${columnSpan(rIndex, cIndex, 'body')}`,
                                        }}>
                                        {typeof column.children === 'function' ? column.children() : column.children}
                                    </td>
                                ))}
                        </tr>
                    ))}
                </tbody>
            )}
        </table>
    );
};

export default memo(TableLayout);
