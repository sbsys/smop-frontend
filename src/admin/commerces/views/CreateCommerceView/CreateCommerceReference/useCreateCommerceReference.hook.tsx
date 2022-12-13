/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
/* context */
import { useCreateCommerceContext } from '../CreateCommerce.context';
/* components */
import { Button } from 'shared/components';
/* hooks */
import { useLoader } from 'shared/hooks';
/* props */
import { CreateCommerceForm } from '../CreateCommerce.props';
import { AdminLang, FieldSetProps, useAdminLang, useAdminNotify } from 'admin/core';
/* utils */
import { milesToMeters } from 'shared/utils';
/* services */
import { departmentListService } from 'admin/commerces/services';
/* types */
import { DepartmentDTO } from 'admin/commerces/types';
/* assets */
import { MdAddCircle, MdError, MdRemoveCircle } from 'react-icons/md';
/* styles */
import { ButtonStyles, FieldStyles } from 'shared/styles';

export const useCreateCommerceReference = () => {
    /* states */
    const {
        /* states */
        countryList,
        /* functions */
        handleNextTab,
    } = useCreateCommerceContext();

    const {
        register,
        setValue,
        formState: { errors },
        watch,
        unregister,
        trigger,
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
    const removePhone = useCallback(() => {
        unregister('servicePhones');

        setPhonesCount(count => (count > 0 ? count - 1 : count));
    }, [unregister]);

    const geolocation = useMemo(() => {
        return {
            lat: watch('geolocation.latitude') || 40,
            lng: watch('geolocation.longitude') || -100,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('geolocation.latitude'), watch('geolocation.longitude')]);

    const meters = milesToMeters(watch('deliveryArea') || 0);

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    const { translate } = useAdminLang();

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

    const handleToNextTab = async () => {
        if (
            await trigger(['referenceName', 'servicePhones', 'geoinformation', 'address', 'zipcode'], {
                shouldFocus: true,
            })
        )
            handleNextTab();
    };

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
            placeholder: translate('createcommerce.name.placeholder'),
            ...register('referenceName'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(
                errors.referenceName ? (errors.referenceName.message as AdminLang) : 'createcommerce.name.hint'
            ),
            children: translate(
                errors.referenceName ? (errors.referenceName.message as AdminLang) : 'createcommerce.name.hint'
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
                placeholder: translate('createcommerce.phones.placeholder'),
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
                        : 'createcommerce.phones.hint'
                ),
                children: translate(
                    errors.servicePhones && errors.servicePhones[index]?.phone
                        ? (errors.servicePhones[index]?.phone?.message as AdminLang)
                        : 'createcommerce.phones.hint'
                ),
            },
        };
    };
    const countryField: FieldSetProps = {
        field: {
            className: errors.geoinformation?.country ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('createcommerce.country.placeholder'),
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
            title: translate(
                errors.geoinformation?.country
                    ? (errors.geoinformation?.country.message as AdminLang)
                    : 'createcommerce.country.hint'
            ),
            children: translate(
                errors.geoinformation?.country
                    ? (errors.geoinformation?.country.message as AdminLang)
                    : 'createcommerce.country.hint'
            ),
        },
    };
    const stateField: FieldSetProps = {
        field: {
            className: errors.geoinformation?.state ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('createcommerce.state.placeholder'),
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
            title: translate(
                errors.geoinformation?.state
                    ? (errors.geoinformation?.state.message as AdminLang)
                    : 'createcommerce.state.hint'
            ),
            children: translate(
                errors.geoinformation?.state
                    ? (errors.geoinformation?.state.message as AdminLang)
                    : 'createcommerce.state.hint'
            ),
        },
    };
    const cityField: FieldSetProps = {
        field: {
            className: errors.geoinformation?.city ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('createcommerce.city.placeholder'),
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
            title: translate(
                errors.geoinformation?.city
                    ? (errors.geoinformation?.city.message as AdminLang)
                    : 'createcommerce.city.hint'
            ),
            children: translate(
                errors.geoinformation?.city
                    ? (errors.geoinformation?.city.message as AdminLang)
                    : 'createcommerce.city.hint'
            ),
        },
    };
    const addressField: FieldSetProps = {
        field: {
            className: errors.address ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('createcommerce.address.placeholder'),
            ...register('address'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(errors.address ? (errors.address.message as AdminLang) : 'createcommerce.address.hint'),
            children: translate(errors.address ? (errors.address.message as AdminLang) : 'createcommerce.address.hint'),
        },
    };
    const optionalAddressField: FieldSetProps = {
        field: {
            className: errors.optionalAddress ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('createcommerce.optaddress.placeholder'),
            ...register('optionalAddress'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(
                errors.optionalAddress
                    ? (errors.optionalAddress.message as AdminLang)
                    : 'createcommerce.optaddress.hint'
            ),
            children: translate(
                errors.optionalAddress
                    ? (errors.optionalAddress.message as AdminLang)
                    : 'createcommerce.optaddress.hint'
            ),
        },
    };
    const zipcodeField: FieldSetProps = {
        field: {
            className: errors.zipcode ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('createcommerce.zipcode.placeholder'),
            ...register('zipcode'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(errors.zipcode ? (errors.zipcode.message as AdminLang) : 'createcommerce.zipcode.hint'),
            children: translate(errors.zipcode ? (errors.zipcode.message as AdminLang) : 'createcommerce.zipcode.hint'),
        },
    };
    const timezoneField: FieldSetProps = {
        field: {
            className: errors.geoinformation?.timezone ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('createcommerce.timezone.placeholder'),
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
                    : 'createcommerce.timezone.hint'
            ),
            children: translate(
                errors.geoinformation?.timezone
                    ? (errors.geoinformation?.timezone.message as AdminLang)
                    : 'createcommerce.timezone.hint'
            ),
        },
    };
    const gtmOffsetField: FieldSetProps = {
        disabled: true,
        field: {
            className: errors.geoinformation?.gtmOffset ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('createcommerce.gtmoffset.placeholder'),
            ...register('geoinformation.gtmOffset'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(
                errors.geoinformation?.gtmOffset
                    ? (errors.geoinformation?.gtmOffset.message as AdminLang)
                    : 'createcommerce.gtmoffset.hint'
            ),
            children: translate(
                errors.geoinformation?.gtmOffset
                    ? (errors.geoinformation?.gtmOffset.message as AdminLang)
                    : 'createcommerce.gtmoffset.hint'
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

    return { geolocation, meters, handleSetGeolocation, handleToNextTab, createCommerceReferenceFields };
};
