/* react */
import { memo } from 'react';
/* custom hook */
import { useUpdateMainTitle } from './useUpdateMainTitle.hook';
/* context */
import { useMainTitleListContext } from '../MainTitleList.context';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet, useAdminLang } from 'admin/core';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateMainTitle.module.scss';

const UpdateMainTitleModal = () => {
    const {
        /* states */
        selectedTitleToUpdate,
    } = useMainTitleListContext();

    const { handleCancelUpdateMainTitle, handleUpdateMainTitle, UpdateMainTitleFieldProps, currentImageURL } =
        useUpdateMainTitle();

    const { translate } = useAdminLang();

    return (
        <ModalLayout
            isVisible={selectedTitleToUpdate !== null}
            rowAlignment="center"
            colAlignment="center"
            hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateMainTitle}>
                <form onSubmit={handleUpdateMainTitle}>
                    <div className={styles.Header} title={translate('maintitleedit.title')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{translate('maintitleedit.title')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        {UpdateMainTitleFieldProps.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}
                    </div>

                    <div className={styles.Previous}>
                        <img src={currentImageURL.url} alt="previous" />

                        <Legend justify="center">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga labore illo repudiandae totam
                            possimus sed aperiam nulla maiores id quasi?
                        </Legend>
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={translate('actions.cancel')}
                            onClick={handleCancelUpdateMainTitle}>
                            <Legend hasDots justify="center">
                                {translate('actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="submit"
                            className={ButtonStyles.FillSecondary}
                            title={translate('actions.update')}>
                            <Legend hasDots justify="center">
                                {translate('actions.update')}
                            </Legend>
                        </Button>
                    </div>
                </form>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateMainTitleModal);
