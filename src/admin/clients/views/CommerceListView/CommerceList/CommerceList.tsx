/* react */
import { memo, useMemo } from 'react';
/* context */
import { useCommerceListContext } from '../CommerceList.context';
/* layouts */
import { PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { CommerceListItem } from '../CommerceListItem';
/* utils */
import { classNames } from 'shared/utils';
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

    const isUnder3Commerces = useMemo(
        () => (organization?.commerces?.length ?? 0) < 3,
        [organization?.commerces?.length]
    );

    return (
        <PanelLayout orientation="col" className={styles.CommerceList}>
            <section className={styles.Branding}>
                <img crossOrigin="anonymous" src={organization?.files?.find(file => file.isCover)?.url} alt="cover" />

                <img
                    crossOrigin="anonymous"
                    src={organization?.files?.find(file => !file.isCover)?.url}
                    alt="profile"
                />
            </section>

            {hasCommerces ? (
                <ScrollLayout orientation="col">
                    <section className={styles.List}>
                        <ul className={classNames(isUnder3Commerces && styles.Under3)}>
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
