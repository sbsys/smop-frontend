/* react */
import { memo, useMemo } from 'react';
/* context */
import { useCommerceListContext } from '../CommerceList.context';
/* layouts */
import { PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { CommerceListItem } from '../CommerceListItem';
/* styles */
import styles from './CommerceList.module.scss';

const CommerceList = () => {
    const {
        /* states */
        organization,
        /* functions */
        handleSelectCommerce,
    } = useCommerceListContext();

    const hasCommerces = useMemo(() => (organization?.commerces?.length ?? 0) > 0, [organization?.commerces?.length]);

    return (
        <PanelLayout orientation="col" className={styles.CommerceList}>
            {hasCommerces ? (
                <ScrollLayout orientation="col">
                    <section className={styles.List}>
                        <ul>
                            {organization?.commerces?.map((commerce, index) => (
                                <li key={index} onClick={handleSelectCommerce(commerce.commerceId)}>
                                    <CommerceListItem {...commerce} />
                                </li>
                            ))}
                        </ul>
                    </section>
                </ScrollLayout>
            ) : (
                <div>No commerces yet</div>
            )}
        </PanelLayout>
    );
};

export default memo(CommerceList);
