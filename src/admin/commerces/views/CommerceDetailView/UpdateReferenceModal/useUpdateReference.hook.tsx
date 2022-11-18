/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* components */
import { Button } from 'shared/components';
/* hooks */
import { useLoader } from 'shared/hooks';
import { AdminLang, FieldSetProps, useAdminLang, useAdminNotify } from 'admin/core';
/* types */
import { CountryListItemDTO, DepartmentDTO, Geoinformation, Geolocation, ServicePhone } from 'admin/commerces/types';
/* services */
import { countryListService, departmentListService, updateReferenceService } from 'admin/commerces/services';
/* utils */
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
/* assets */
import { MdAddCircle, MdCheckCircle, MdError, MdRemoveCircle } from 'react-icons/md';
/* styles */
import { ButtonStyles, FieldStyles } from 'shared/styles';

export interface UpdateReferenceForm {
    referenceName: string;
    address: string;
    optionalAddress: string;
    zipcode: string;
    geoinformation: Geoinformation;
    servicePhones: ServicePhone[];
    geolocation: Omit<Geolocation, 'error'>;
}

const UpdateReferenceSchema = yup
    .object({
        referenceName: yup.string().required('commerceedit.name.required'),
        servicePhones: yup.array(
            yup
                .object({
                    phone: yup
                        .string()
                        .required('commerceedit.phones.required')
                        .matches(/^\+\d{3}-\d{7,8}$/, 'commerceedit.phones.format'),
                })
                .required()
        ),
        geoinformation: yup
            .object({
                country: yup.string().required('commerceedit.country.required'),
                state: yup.string().required('commerceedit.state.required'),
                city: yup.string().required('commerceedit.city.required'),
                timezone: yup.string().required('commerceedit.timezone.required'),
                gtmOffset: yup.string().required('commerceedit.gtmoffset.required'),
            })
            .required(),
        address: yup.string().required('commerceedit.address.required'),
        zipcode: yup.string().required('commerceedit.zipcode.required'),
    })
    .required();

export const useUpdateReference = () => {
    /* states */
    const {
        /* states */
        commerce,
        isUpdateReference,
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
        watch,
    } = useForm<UpdateReferenceForm>({
        mode: 'all',
        resolver: yupResolver(UpdateReferenceSchema),
    });

    const [countryList, setCountryList] = useState<CountryListItemDTO[]>([]);

    const [departmentList, setDepartmentList] = useState<DepartmentDTO>({
        states: [],
        timezones: [],
    });

    const cities = useMemo(() => {
        return departmentList.states.find(current => current.name === watch('geoinformation.state'))?.cities ?? [];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [departmentList.states, watch('geoinformation.state')]);

    const { translate } = useAdminLang();

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    /* functions */
    const handleUpdateReference = handleSubmit(async data => {
        showLoader();

        const service = await updateReferenceService(commerce?.commerceId ?? '', data);

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

        setDepartmentList({
            states: [],
            timezones: [],
        });
    };

    const handleSetGeolocation = useCallback(
        (latitude: number, longitude: number) => {
            setValue('geolocation.latitude', latitude);

            setValue('geolocation.longitude', longitude);
        },
        [setValue]
    );

    const getCountryList = useCallback(async () => {
        if (!isUpdateReference) return;

        showLoader();

        const service = await countryListService({});

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdError />,
                timestamp: new Date(),
                text: service.message,
            });

        setCountryList(service.data);
    }, [hideLoader, isUpdateReference, notify, showLoader]);

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
        handleSetPhonesCount();
    }, [handleSetPhonesCount]);

    useEffect(() => {
        getCountryList();
    }, [getCountryList]);

    useEffect(() => {
        getDepartmentList();
    }, [getDepartmentList]);

    useEffect(() => {
        if (countryList.length > 0) setValue('geoinformation.country', commerce?.geoinformation.country ?? '');
    }, [commerce?.geoinformation.country, countryList, setValue]);

    useEffect(() => {
        if (watch('geoinformation.timezone'))
            setValue(
                'geoinformation.gtmOffset',
                departmentList.timezones.find(current => current.zoneName === watch('geoinformation.timezone'))
                    ?.gmtOffsetName ?? ''
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('geoinformation.timezone')]);

    useEffect(() => {
        if (departmentList.states.length > 0) setValue('geoinformation.state', commerce?.geoinformation.state ?? '');
    }, [commerce?.geoinformation.state, departmentList.states, setValue]);

    useEffect(() => {
        if (watch('geoinformation.state') === commerce?.geoinformation.state)
            setValue('geoinformation.city', commerce?.geoinformation.city ?? '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commerce?.geoinformation.city, commerce?.geoinformation.state, setValue, watch('geoinformation.state')]);

    useEffect(() => {
        if (departmentList.timezones.length > 0)
            setValue('geoinformation.timezone', commerce?.geoinformation.timezone ?? '');
    }, [commerce?.geoinformation.timezone, departmentList.timezones, setValue]);

    /* props */
    const referenceNameField: FieldSetProps = {
        field: {
            className: errors.referenceName ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('commerceedit.name.placeholder'),
            defaultValue: commerce?.referenceName,
            ...register('referenceName'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(
                errors.referenceName ? (errors.referenceName.message as AdminLang) : 'commerceedit.name.hint'
            ),
            children: translate(
                errors.referenceName ? (errors.referenceName.message as AdminLang) : 'commerceedit.name.hint'
            ),
        },
    };
    const servicePhonesField = (index: number): FieldSetProps => {
        return {
            field: {
                className:
                    errors.servicePhones && errors.servicePhones[index]?.phone
                        ? FieldStyles.OutlineDanger
                        : FieldStyles.OutlinePrimary,
                placeholder: translate('commerceedit.phones.placeholder'),
                defaultValue: commerce?.servicePhones[index]?.phone,
                beforeContent:
                    index > 0 && index + 1 === phonesCount ? (
                        <Button
                            onClick={removePhone}
                            className={ButtonStyles.Plain}
                            type="button"
                            title={translate('actions.remove')}>
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
                            title={translate('actions.add')}>
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
                title: translate(
                    errors.servicePhones && errors.servicePhones[index]?.phone
                        ? (errors.servicePhones[index]?.phone?.message as AdminLang)
                        : 'commerceedit.phones.hint'
                ),
                children: translate(
                    errors.servicePhones && errors.servicePhones[index]?.phone
                        ? (errors.servicePhones[index]?.phone?.message as AdminLang)
                        : 'commerceedit.phones.hint'
                ),
            },
        };
    };
    const countryField: FieldSetProps = {
        field: {
            className: errors.geoinformation?.country ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('commerceedit.country.placeholder'),
            strategy: 'select',
            options: countryList.map(item => ({
                label: item.name,
                value: item.name,
            })),
            defaultValue: commerce?.geoinformation.country,
            ...register('geoinformation.country'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(
                errors.geoinformation?.country
                    ? (errors.geoinformation?.country.message as AdminLang)
                    : 'commerceedit.country.hint'
            ),
            children: translate(
                errors.geoinformation?.country
                    ? (errors.geoinformation?.country.message as AdminLang)
                    : 'commerceedit.country.hint'
            ),
        },
    };
    const stateField: FieldSetProps = {
        field: {
            className: errors.geoinformation?.state ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('commerceedit.state.placeholder'),
            strategy: 'select',
            options: departmentList.states.map(item => ({
                label: item.name,
                value: item.name,
            })),
            defaultValue: commerce?.geoinformation.state,
            ...register('geoinformation.state'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(
                errors.geoinformation?.state
                    ? (errors.geoinformation?.state.message as AdminLang)
                    : 'commerceedit.state.hint'
            ),
            children: translate(
                errors.geoinformation?.state
                    ? (errors.geoinformation?.state.message as AdminLang)
                    : 'commerceedit.state.hint'
            ),
        },
    };
    const cityField: FieldSetProps = {
        field: {
            className: errors.geoinformation?.city ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('commerceedit.city.placeholder'),
            strategy: 'select',
            options: cities.map(item => ({
                label: item.name,
                value: item.name,
            })),
            defaultValue: commerce?.geoinformation.city,
            ...register('geoinformation.city'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(
                errors.geoinformation?.city
                    ? (errors.geoinformation?.city.message as AdminLang)
                    : 'commerceedit.city.hint'
            ),
            children: translate(
                errors.geoinformation?.city
                    ? (errors.geoinformation?.city.message as AdminLang)
                    : 'commerceedit.city.hint'
            ),
        },
    };
    const addressField: FieldSetProps = {
        field: {
            className: errors.address ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('commerceedit.address.placeholder'),
            defaultValue: commerce?.address,
            ...register('address'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(errors.address ? (errors.address.message as AdminLang) : 'commerceedit.address.hint'),
            children: translate(errors.address ? (errors.address.message as AdminLang) : 'commerceedit.address.hint'),
        },
    };
    const optionalAddressField: FieldSetProps = {
        field: {
            className: errors.optionalAddress ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('commerceedit.optaddress.placeholder'),
            defaultValue: commerce?.optionalAddress,
            ...register('optionalAddress'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(
                errors.optionalAddress ? (errors.optionalAddress.message as AdminLang) : 'commerceedit.optaddress.hint'
            ),
            children: translate(
                errors.optionalAddress ? (errors.optionalAddress.message as AdminLang) : 'commerceedit.optaddress.hint'
            ),
        },
    };
    const zipcodeField: FieldSetProps = {
        field: {
            className: errors.zipcode ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('commerceedit.zipcode.placeholder'),
            defaultValue: commerce?.zipcode,
            ...register('zipcode'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(errors.zipcode ? (errors.zipcode.message as AdminLang) : 'commerceedit.zipcode.hint'),
            children: translate(errors.zipcode ? (errors.zipcode.message as AdminLang) : 'commerceedit.zipcode.hint'),
        },
    };
    const timezoneField: FieldSetProps = {
        field: {
            className: errors.geoinformation?.timezone ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('commerceedit.timezone.placeholder'),
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
            title: translate(
                errors.geoinformation?.timezone
                    ? (errors.geoinformation?.timezone.message as AdminLang)
                    : 'commerceedit.timezone.hint'
            ),
            children: translate(
                errors.geoinformation?.timezone
                    ? (errors.geoinformation?.timezone.message as AdminLang)
                    : 'commerceedit.timezone.hint'
            ),
        },
    };
    const gtmOffsetField: FieldSetProps = {
        disabled: true,
        field: {
            className: errors.geoinformation?.gtmOffset ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('commerceedit.gtmoffset.placeholder'),
            defaultValue: commerce?.geoinformation.gtmOffset,
            ...register('geoinformation.gtmOffset'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(
                errors.geoinformation?.gtmOffset
                    ? (errors.geoinformation?.gtmOffset.message as AdminLang)
                    : 'commerceedit.gtmoffset.hint'
            ),
            children: translate(
                errors.geoinformation?.gtmOffset
                    ? (errors.geoinformation?.gtmOffset.message as AdminLang)
                    : 'commerceedit.gtmoffset.hint'
            ),
        },
    };

    const updateReferenceFormFields: FieldSetProps[] = [
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

    return { handleUpdateReference, handleResetUpdateReferenceForm, handleSetGeolocation, updateReferenceFormFields };
};
