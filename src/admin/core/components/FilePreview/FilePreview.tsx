/* react */
import { memo } from 'react';
/* utils */
import { classNames } from 'shared/utils';
/* assets */
import { MdAdd } from 'react-icons/md';
import { TenantCoverSrc } from 'assets';
/* styles */
import styles from './FilePreview.module.scss';

const FilePreview = () => {
    return (
        <span className={classNames(styles.FilePreview)}>
            {true ? (
                <object data={TenantCoverSrc} aria-label="upload" type="image/jpeg" className={styles.Preview} />
            ) : (
                <i>
                    <MdAdd />
                </i>
            )}
        </span>
    );
};

export default memo(FilePreview);
