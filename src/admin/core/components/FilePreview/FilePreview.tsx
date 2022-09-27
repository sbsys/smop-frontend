/* react */
import { FC, memo } from 'react';
/* props */
import { FilePreviewProps } from './FilePreview.props';
/* utils */
import { classNames } from 'shared/utils';
/* assets */
import { MdAdd } from 'react-icons/md';
/* styles */
import styles from './FilePreview.module.scss';

const FilePreview: FC<FilePreviewProps> = ({ className, data, type }) => {
    return (
        <span className={classNames(styles.FilePreview, className)}>
            {data && type ? (
                <object data={data} aria-label="upload" type={type} className={styles.Preview} />
            ) : (
                <i>
                    <MdAdd />
                </i>
            )}
        </span>
    );
};

export default memo(FilePreview);
