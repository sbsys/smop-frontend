/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* context */
import { useCreateCommerceContext } from '../CreateCommerce.context';
/* components */
import { Button } from 'shared/components';
/* hooks */
import { useLoader } from 'shared/hooks';
/* props */
import { CreateCommerceForm } from '../CreateCommerce.props';
import { FieldSetProps, useAdminNotify } from 'admin/core';
/* utils */
import { milesToMeters } from 'shared/utils';
/* services */
import { departmentListService } from 'admin/commerces/services';
/* assets */
import { MdAddCircle, MdError, MdRemoveCircle } from 'react-icons/md';
/* styles */
import { ButtonStyles, FieldStyles } from 'shared/styles';
import { DepartmentDTO } from 'admin/commerces/types';

export const useCreateCommerceReference = () => {
    /* states */
    const {
        /* states */
        countryList,
    } = useCreateCommerceContext();

    const {
        register,
        setValue,
        formState: { errors },
        watch,
    } = useFormContext<CreateCommerceForm>();

    const [departmentList, setDepartmentList] = useState<DepartmentDTO>({
        states: [],
        timezones: [],
    });

    const cities = useMemo(() => {
        return departmentList.states.find(current => current.name === watch('geoinformation.state'))?.cities ?? [];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [departmentList.states, watch('geoinformation.state')]);

    const [phonesCount, setPhonesCount] = useState(1);
    const addPhone = useCallback(() => setPhonesCount(count => count + 1), []);
    const removePhone = useCallback(() => setPhonesCount(count => (count > 0 ? count - 1 : count)), []);

    const geolocation = useMemo(() => {
        return {
            lat: watch('geolocation.latitude') || 0,
            lng: watch('geolocation.longitude') || 0,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('geolocation.latitude'), watch('geolocation.longitude')]);

    const meters = milesToMeters(watch('deliveryArea') || 0);

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    const { t } = useTranslation();

    /* functions */
    const handleSetGeolocation = useCallback(
        (latitude: number, longitude: number) => {
            setValue('geolocation.latitude', latitude);

            setValue('geolocation.longitude', longitude);
        },
        [setValue]
    );

    const getCurrentGeolocation = useCallback(() => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            handleSetGeolocation(coords.latitude, coords.longitude);
        });
    }, [handleSetGeolocation]);

    /* reactivity */
    useEffect(() => {
        getCurrentGeolocation();
    }, [getCurrentGeolocation]);

    const getDepartmentList = useCallback(async () => {
        if (!watch('geoinformation.country')) return;

        showLoader();

        const cca3 = countryList.find(current => current.name === watch('geoinformation.country'))?.cca3 ?? '';

        const service = await departmentListService({ cca3 });

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdError />,
                timestamp: new Date(),
                text: service.message,
            });

        setDepartmentList(service.data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hideLoader, notify, showLoader, watch('geoinformation.country')]);

    /* reactivity */
    useEffect(() => {
        getDepartmentList();
    }, [getDepartmentList]);

    useEffect(() => {
        if (watch('geoinformation.timezone'))
            setValue(
                'geoinformation.gtmOffset',
                departmentList.timezones.find(current => current.zoneName === watch('geoinformation.timezone'))
                    ?.gmtOffsetName ?? ''
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('geoinformation.timezone')]);

    /* props */
    const referenceNameField: FieldSetProps = {
        field: {
            className: errors.referenceName ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.createcommerce.reference.form.name.placeholder'),
            ...register('referenceName'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.referenceName
                    ? (errors.referenceName.message as string)
                    : 'views.createcommerce.reference.form.name.hint'
            ),
            children: t(
                errors.referenceName
                    ? (errors.referenceName.message as string)
                    : 'views.createcommerce.reference.form.name.hint'
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
                placeholder: t('views.createcommerce.reference.form.servicephones.placeholder'),
                beforeContent:
                    index > 0 && index + 1 === phonesCount ? (
                        <Button
                            onClick={removePhone}
                            className={ButtonStyles.Plain}
                            type="button"
                            title={t('views.createcommerce.reference.form.servicephones.remove')}>
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
                            title={t('views.createcommerce.reference.form.servicephones.add')}>
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
                        : 'views.createcommerce.reference.form.servicephones.hint'
                ),
                children: t(
                    errors.servicePhones && errors.servicePhones[index]
                        ? (errors.servicePhones[index]?.message as string)
                        : 'views.createcommerce.reference.form.servicephones.hint'
                ),
            },
        };
    };
    const countryField: FieldSetProps = {
        field: {
            className: errors.geoinformation?.country ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.createcommerce.reference.form.country.placeholder'),
            strategy: 'select',
            options: countryList.map(item => ({
                label: item.name,
                value: item.name,
            })),
            ...register('geoinformation.country'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.geoinformation?.country
                    ? (errors.geoinformation?.country.message as string)
                    : 'views.createcommerce.reference.form.country.hint'
            ),
            children: t(
                errors.geoinformation?.country
                    ? (errors.geoinformation?.country.message as string)
                    : 'views.createcommerce.reference.form.country.hint'
            ),
        },
    };
    const stateField: FieldSetProps = {
        field: {
            className: errors.geoinformation?.state ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.createcommerce.reference.form.state.placeholder'),
            strategy: 'select',
            options: departmentList.states.map(item => ({
                label: item.name,
                value: item.name,
            })),
            ...register('geoinformation.state'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.geoinformation?.state
                    ? (errors.geoinformation?.state.message as string)
                    : 'views.createcommerce.reference.form.state.hint'
            ),
            children: t(
                errors.geoinformation?.state
                    ? (errors.geoinformation?.state.message as string)
                    : 'views.createcommerce.reference.form.state.hint'
            ),
        },
    };
    const cityField: FieldSetProps = {
        field: {
            className: errors.geoinformation?.city ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.createcommerce.reference.form.city.placeholder'),
            strategy: 'select',
            options: cities.map(item => ({
                label: item.name,
                value: item.name,
            })),
            ...register('geoinformation.city'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.geoinformation?.city
                    ? (errors.geoinformation?.city.message as string)
                    : 'views.createcommerce.reference.form.city.hint'
            ),
            children: t(
                errors.geoinformation?.city
                    ? (errors.geoinformation?.city.message as string)
                    : 'views.createcommerce.reference.form.city.hint'
            ),
        },
    };
    const addressField: FieldSetProps = {
        field: {
            className: errors.address ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.createcommerce.reference.form.address.placeholder'),
            ...register('address'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.address ? (errors.address.message as string) : 'views.createcommerce.reference.form.address.hint'
            ),
            children: t(
                errors.address ? (errors.address.message as string) : 'views.createcommerce.reference.form.address.hint'
            ),
        },
    };
    const optionalAddressField: FieldSetProps = {
        field: {
            className: errors.optionalAddress ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.createcommerce.reference.form.optionaladdress.placeholder'),
            ...register('optionalAddress'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.optionalAddress
                    ? (errors.optionalAddress.message as string)
                    : 'views.createcommerce.reference.form.optionaladdress.hint'
            ),
            children: t(
                errors.optionalAddress
                    ? (errors.optionalAddress.message as string)
                    : 'views.createcommerce.reference.form.optionaladdress.hint'
            ),
        },
    };
    const zipcodeField: FieldSetProps = {
        field: {
            className: errors.zipcode ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.createcommerce.reference.form.zipcode.placeholder'),
            ...register('zipcode'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.zipcode ? (errors.zipcode.message as string) : 'views.createcommerce.reference.form.zipcode.hint'
            ),
            children: t(
                errors.zipcode ? (errors.zipcode.message as string) : 'views.createcommerce.reference.form.zipcode.hint'
            ),
        },
    };
    const timezoneField: FieldSetProps = {
        field: {
            className: errors.geoinformation?.timezone ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.createcommerce.reference.form.timezone.placeholder'),
            strategy: 'select',
            options: departmentList.timezones.map(item => ({
                label: item.zoneName,
                value: item.zoneName,
            })),
            ...register('geoinformation.timezone'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.geoinformation?.timezone
                    ? (errors.geoinformation?.timezone.message as string)
                    : 'views.createcommerce.reference.form.timezone.hint'
            ),
            children: t(
                errors.geoinformation?.timezone
                    ? (errors.geoinformation?.timezone.message as string)
                    : 'views.createcommerce.reference.form.timezone.hint'
            ),
        },
    };
    const gtmOffsetField: FieldSetProps = {
        disabled: true,
        field: {
            className: errors.geoinformation?.gtmOffset ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.createcommerce.reference.form.gtmoffset.placeholder'),
            ...register('geoinformation.gtmOffset'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.geoinformation?.gtmOffset
                    ? (errors.geoinformation?.gtmOffset.message as string)
                    : 'views.createcommerce.reference.form.gtmoffset.hint'
            ),
            children: t(
                errors.geoinformation?.gtmOffset
                    ? (errors.geoinformation?.gtmOffset.message as string)
                    : 'views.createcommerce.reference.form.gtmoffset.hint'
            ),
        },
    };

    const createCommerceReferenceFields: FieldSetProps[] = [
        referenceNameField,
        ...[...Array(phonesCount)].map((_, index) => servicePhonesField(index)),
        countryField,
        stateField,
        cityField,
        addressField,
        optionalAddressField,
        zipcodeField,
        timezoneField,
        gtmOffsetField,
    ];

    return { geolocation, meters, handleSetGeolocation, createCommerceReferenceFields };
};
