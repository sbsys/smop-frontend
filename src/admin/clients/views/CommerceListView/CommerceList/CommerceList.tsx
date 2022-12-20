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
        organization: { files, commerces },
        /* functions */
        handleSelectCommerce,
    } = useCommerceListContext();

    const hasCommerces = useMemo(() => commerces.length > 0, [commerces.length]);

    const isUnder3Commerces = useMemo(() => commerces.length < 3, [commerces.length]);

    return (
        <PanelLayout orientation="col" className={styles.CommerceList}>
            <section className={styles.Branding}>
                <img crossOrigin="anonymous" src={files.find(file => file.isCover)?.url} alt="cover" />

                <img crossOrigin="anonymous" src={files.find(file => !file.isCover)?.url} alt="profile" />
            </section>

            {hasCommerces ? (
                <ScrollLayout orientation="col">
                    <section className={styles.List}>
                        <ul className={classNames(isUnder3Commerces && styles.Under3)}>
                            {commerces.map((commerce, index) => (
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
