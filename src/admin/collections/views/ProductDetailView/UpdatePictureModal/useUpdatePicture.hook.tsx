/* react */
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
/* props */
import { AdminLang, FieldSetProps, FilePreview, FilePreviewProps, useAdminLang, useAdminNotify } from 'admin/core';
/* context */
import { useProductDetailContext } from '../ProductDetail.context';
/* hooks */
import { useDragAndDropFiles, useLoader } from 'shared/hooks';
/* components */
import { Button, Legend } from 'shared/components';
/* services */
import { updatePictureService } from 'admin/collections/services';
/* utils */
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { classNames } from 'shared/utils';
/* assets */
import { MdCheckCircle, MdClose, MdError } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdatePicture.module.scss';

export interface UpdatePictureFormData {
    image: FileList;
}

const UpdatePictureSchema = yup.object({
    /* file */
    image: yup
        .mixed()
        .test('required', 'productedit.image.required' as AdminLang, value => value && value.length > 0)
        .test(
            'fileSize',
            'productedit.image.size' as AdminLang,
            value => value && value[0] && value[0].size <= 10000000
        )
        .test(
            'type',
            'productedit.image.type' as AdminLang,
            value => value && value[0] && (value[0].type === 'image/jpeg' || value[0].type === 'image/png')
        ),
});

export const useUpdatePicture = () => {
    /* states */
    const {
        /* states */
        product,
        hideUpdatePicture,
        /* functions */
        getProductDetail,
    } = useProductDetailContext();

    const [imageFileProps, isImageDragging] = useDragAndDropFiles();

    const { translate } = useAdminLang();

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    const {
        handleSubmit,
        reset,
        register,
        formState: { errors },
        resetField,
        watch,
    } = useForm<UpdatePictureFormData>({
        mode: 'all',
        resolver: yupResolver(UpdatePictureSchema),
    });

    /* functions */
    const handleResetUpdatePicture = () => {
        reset({
            image: undefined,
        });

        hideUpdatePicture();
    };

    const handleUpdatePicture = handleSubmit(async data => {
        showLoader();

        const service = await updatePictureService(product?.productId ?? '', { image: data.image[0] });

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdError />,
                timestamp: new Date(),
                text: service.message,
            });

        notify('success', {
            title: 'Success',
            icon: <MdCheckCircle />,
            timestamp: new Date(),
            text: service.message,
        });

        handleResetUpdatePicture();

        getProductDetail();
    });

    /* reactivity */

    /* props */
    const imagePreviewProps: FilePreviewProps = useMemo(
        () => ({
            className: classNames(styles.Preview, isImageDragging && styles.DraggingBorder),
            data: watch('image')?.length > 0 ? URL.createObjectURL(watch('image')[0]) : undefined,
            type: watch('image')?.length > 0 ? watch('image')[0].type : undefined,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isImageDragging, watch('image')]
    );
    const imageProps: FieldSetProps = {
        className: styles.Preview,
        field: {
            strategy: 'file',
            ...imageFileProps,
            children: <FilePreview {...imagePreviewProps} />,
            ...register('image'),
            ...{
                ref: (node: any) => {
                    register('image').ref(node);
                    imageFileProps.ref.current = node;
                },
            },
        },
        isHintReserved: true,
        hint: {
            className: classNames(styles.CloseImg, errors.image && styles.NoPhotoHint),
            children: (
                <>
                    <Legend
                        hasDots
                        title={
                            errors.image
                                ? translate(errors.image.message as AdminLang)
                                : translate('productedit.image.hint')
                        }>
                        {errors.image
                            ? translate(errors.image.message as AdminLang)
                            : translate('productedit.image.hint')}
                    </Legend>

                    {watch('image')?.length > 0 && (
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            onClick={() => resetField('image')}
                            title={translate('actions.remove')}>
                            <i>
                                <MdClose />
                            </i>
                        </Button>
                    )}
                </>
            ),
        },
    };

    const updatePictureFields: FieldSetProps[] = [imageProps];

    return { handleUpdatePicture, handleResetUpdatePicture, updatePictureFields };
};
