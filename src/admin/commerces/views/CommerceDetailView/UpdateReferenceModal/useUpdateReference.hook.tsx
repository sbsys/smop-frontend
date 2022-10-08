/* react */
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* components */
import { Button } from 'shared/components';
/* hooks */
import { useLoader } from 'shared/hooks';
import { FieldSetProps, useAdminNotify } from 'admin/core';
/* types */
import { Geoinformation, Geolocation, ServicePhone } from 'admin/commerces/types';
/* assets */
import { MdAddCircle, MdCheckCircle, MdError, MdRemoveCircle } from 'react-icons/md';
/* styles */
import { ButtonStyles, FieldStyles } from 'shared/styles';

interface UpdateReferenceForm {
    referenceName: string;
    address: string;
    optionalAddress: string;
    zipcode: string;
    geoinformation: Geoinformation;
    servicePhones: ServicePhone[];
    geolocation: Omit<Geolocation, 'error'>;
}

export const useUpdateReference = () => {
    /* states */
    const {
        /* states */
        commerce,
        hideUpdateReference,
        /* functions */
        getCommerceDetail,
    } = useCommerceDetailContext();

    const [phonesCount, setPhonesCount] = useState(1);
    const addPhone = useCallback(() => setPhonesCount(count => count + 1), []);
    const removePhone = useCallback(() => setPhonesCount(count => (count > 0 ? count - 1 : count)), []);

    const handleSetPhonesCount = useCallback(() => {
        if ((commerce?.servicePhones.length ?? 0) > 0) setPhonesCount(commerce?.servicePhones.length ?? 1);
    }, [commerce?.servicePhones.length]);

    const {
        handleSubmit,
        reset,
        register,
        formState: { errors },
        setValue,
    } = useForm<UpdateReferenceForm>();

    const { t } = useTranslation();

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    /* functions */
    const handleUpdateReference = handleSubmit(async data => {
        showLoader();
        console.log(data);

        const service = await { error: true, message: 'Update reference', data: {} };

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

        hideUpdateReference();

        getCommerceDetail();
    });

    const handleResetUpdateReferenceForm = () => {
        handleSetPhonesCount();

        reset();
    };

    const handleSetGeolocation = useCallback(
        (latitude: number, longitude: number) => {
            setValue('geolocation.latitude', latitude);

            setValue('geolocation.longitude', longitude);
        },
        [setValue]
    );

    /* reactivity */
    useEffect(() => {
        handleSetPhonesCount();
    }, [handleSetPhonesCount]);

    /* props */
    const referenceNameField: FieldSetProps = {
        field: {
            className: errors.referenceName ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.commercedetail.updatereference.form.name.placeholder'),
            defaultValue: commerce?.referenceName,
            ...register('referenceName'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.referenceName
                    ? (errors.referenceName.message as string)
                    : 'views.commercedetail.updatereference.form.name.hint'
            ),
            children: t(
                errors.referenceName
                    ? (errors.referenceName.message as string)
                    : 'views.commercedetail.updatereference.form.name.hint'
            ),
        },
    };
    const servicePhonesField = (index: number): FieldSetProps => {
        return {
            field: {
                className:
                    errors.servicePhones && errors.servicePhones[index]
                        ? FieldStyles.OutlineDanger
                        : FieldStyles.OutlinePrimary,
                placeholder: t('views.commercedetail.updatereference.form.servicephones.placeholder'),
                defaultValue: commerce?.servicePhones[index]?.phone,
                beforeContent:
                    index > 0 && index + 1 === phonesCount ? (
                        <Button
                            onClick={removePhone}
                            className={ButtonStyles.Plain}
                            type="button"
                            title={t('views.commercedetail.updatereference.form.servicephones.remove')}>
                            <i>
                                <MdRemoveCircle />
                            </i>
                        </Button>
                    ) : undefined,
                afterContent:
                    index + 1 === phonesCount ? (
                        <Button
                            onClick={addPhone}
                            className={ButtonStyles.Plain}
                            type="button"
                            title={t('views.commercedetail.updatereference.form.servicephones.add')}>
                            <i>
                                <MdAddCircle />
                            </i>
                        </Button>
                    ) : undefined,
                ...register(`servicePhones.${index}.phone`),
            },
            isHintReserved: true,
            hint: {
                hasDots: true,
                title: t(
                    errors.servicePhones && errors.servicePhones[index]
                        ? (errors.servicePhones[index]?.message as string)
                        : 'views.commercedetail.updatereference.form.servicephones.hint'
                ),
                children: t(
                    errors.servicePhones && errors.servicePhones[index]
                        ? (errors.servicePhones[index]?.message as string)
                        : 'views.commercedetail.updatereference.form.servicephones.hint'
                ),
            },
        };
    };
    const countryField: FieldSetProps = {
        field: {
            className: errors.geoinformation?.country ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.commercedetail.updatereference.form.country.placeholder'),
            strategy: 'select',
            defaultValue: commerce?.geoinformation.country,
            ...register('geoinformation.country'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.geoinformation?.country
                    ? (errors.geoinformation?.country.message as string)
                    : 'views.commercedetail.updatereference.form.country.hint'
            ),
            children: t(
                errors.geoinformation?.country
                    ? (errors.geoinformation?.country.message as string)
                    : 'views.commercedetail.updatereference.form.country.hint'
            ),
        },
    };
    const cityField: FieldSetProps = {
        field: {
            className: errors.geoinformation?.city ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.commercedetail.updatereference.form.city.placeholder'),
            strategy: 'select',
            defaultValue: commerce?.geoinformation.city,
            ...register('geoinformation.city'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.geoinformation?.city
                    ? (errors.geoinformation?.city.message as string)
                    : 'views.commercedetail.updatereference.form.city.hint'
            ),
            children: t(
                errors.geoinformation?.city
                    ? (errors.geoinformation?.city.message as string)
                    : 'views.commercedetail.updatereference.form.city.hint'
            ),
        },
    };
    const stateField: FieldSetProps = {
        field: {
            className: errors.geoinformation?.state ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.commercedetail.updatereference.form.state.placeholder'),
            strategy: 'select',
            defaultValue: commerce?.geoinformation.state,
            ...register('geoinformation.state'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.geoinformation?.state
                    ? (errors.geoinformation?.state.message as string)
                    : 'views.commercedetail.updatereference.form.state.hint'
            ),
            children: t(
                errors.geoinformation?.state
                    ? (errors.geoinformation?.state.message as string)
                    : 'views.commercedetail.updatereference.form.state.hint'
            ),
        },
    };
    const addressField: FieldSetProps = {
        field: {
            className: errors.address ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.commercedetail.updatereference.form.address.placeholder'),
            defaultValue: commerce?.address,
            ...register('address'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.address
                    ? (errors.address.message as string)
                    : 'views.commercedetail.updatereference.form.address.hint'
            ),
            children: t(
                errors.address
                    ? (errors.address.message as string)
                    : 'views.commercedetail.updatereference.form.address.hint'
            ),
        },
    };
    const optionalAddressField: FieldSetProps = {
        field: {
            className: errors.optionalAddress ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.commercedetail.updatereference.form.optionaladdress.placeholder'),
            defaultValue: commerce?.optionalAddress,
            ...register('optionalAddress'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.optionalAddress
                    ? (errors.optionalAddress.message as string)
                    : 'views.commercedetail.updatereference.form.optionaladdress.hint'
            ),
            children: t(
                errors.optionalAddress
                    ? (errors.optionalAddress.message as string)
                    : 'views.commercedetail.updatereference.form.optionaladdress.hint'
            ),
        },
    };
    const zipcodeField: FieldSetProps = {
        field: {
            className: errors.zipcode ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.commercedetail.updatereference.form.zipcode.placeholder'),
            defaultValue: commerce?.zipcode,
            ...register('zipcode'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.zipcode
                    ? (errors.zipcode.message as string)
                    : 'views.commercedetail.updatereference.form.zipcode.hint'
            ),
            children: t(
                errors.zipcode
                    ? (errors.zipcode.message as string)
                    : 'views.commercedetail.updatereference.form.zipcode.hint'
            ),
        },
    };
    const timezoneField: FieldSetProps = {
        field: {
            className: errors.geoinformation?.timezone ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.commercedetail.updatereference.form.timezone.placeholder'),
            strategy: 'select',
            defaultValue: commerce?.geoinformation.timezone,
            ...register('geoinformation.timezone'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.geoinformation?.timezone
                    ? (errors.geoinformation?.timezone.message as string)
                    : 'views.commercedetail.updatereference.form.timezone.hint'
            ),
            children: t(
                errors.geoinformation?.timezone
                    ? (errors.geoinformation?.timezone.message as string)
                    : 'views.commercedetail.updatereference.form.timezone.hint'
            ),
        },
    };
    const gtmOffsetField: FieldSetProps = {
        field: {
            className: errors.geoinformation?.gtmOffset ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.commercedetail.updatereference.form.gtmoffset.placeholder'),
            strategy: 'select',
            defaultValue: commerce?.geoinformation.gtmOffset,
            ...register('geoinformation.gtmOffset'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.geoinformation?.gtmOffset
                    ? (errors.geoinformation?.gtmOffset.message as string)
                    : 'views.commercedetail.updatereference.form.gtmoffset.hint'
            ),
            children: t(
                errors.geoinformation?.gtmOffset
                    ? (errors.geoinformation?.gtmOffset.message as string)
                    : 'views.commercedetail.updatereference.form.gtmoffset.hint'
            ),
        },
    };

    const updateReferenceFormFields: FieldSetProps[] = [
        referenceNameField,
        ...[...Array(phonesCount)].map((_, index) => servicePhonesField(index)),
        countryField,
        cityField,
        stateField,
        addressField,
        optionalAddressField,
        zipcodeField,
        timezoneField,
        gtmOffsetField,
    ];

    return { handleUpdateReference, handleResetUpdateReferenceForm, handleSetGeolocation, updateReferenceFormFields };
};
