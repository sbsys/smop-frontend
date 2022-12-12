/* react */
import { memo } from 'react';
/* layouts */
import { PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { CommerceListItem } from '../CommerceListItem';
/* assets */
import { TenantCoverSrc, TenantProfileSrc } from 'assets';
/* styles */
import styles from './CommerceList.module.scss';
import { useCommerceListContext } from '../CommerceList.context';

const CommerceList = () => {
    const {
        /* functions */
        handleSelectCommerce,
    } = useCommerceListContext();

    return (
        <PanelLayout orientation="col" className={styles.CommerceList}>
            <section className={styles.Branding}>
                <img crossOrigin="anonymous" src={TenantCoverSrc} alt="cover" />

                <img crossOrigin="anonymous" src={TenantProfileSrc} alt="profile" />
            </section>

            <ScrollLayout orientation="col">
                <section className={styles.List}>
                    <ul>
                        {[...Array(10)].map((_, index) => (
                            <li key={index} onClick={handleSelectCommerce('commerceId')}>
                                <CommerceListItem />
                            </li>
                        ))}
                    </ul>
                </section>
            </ScrollLayout>
        </PanelLayout>
    );
};

export default memo(CommerceList);
