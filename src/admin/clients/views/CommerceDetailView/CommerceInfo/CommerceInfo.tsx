/* react */
import { memo } from 'react';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
/* styles */
import styles from './CommerceInfo.module.scss';

const CommerceInfo = () => {
    const {
        /* states */
        commerce,
    } = useCommerceDetailContext();

    return (
        <ScrollLayout orientation="col">
            <div className={styles.CommerceInfo}>
                <section>
                    <div className={styles.Header}>
                        <h2 title={commerce.referenceName}>
                            <Legend hasDots justify="center">
                                {commerce.referenceName}
                            </Legend>
                        </h2>
                    </div>

                    <div className={styles.General}></div>
                </section>
            </div>
        </ScrollLayout>
    );
};

export default memo(CommerceInfo);
