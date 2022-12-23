import { ApplyChargeMap, CommerceDetail, ServiceHour, ServiceHours } from '../types';

export const serviceHourListSerializer = (data: any[]): ServiceHour[] => {
    return data.map((serviceHour: any) => ({ ...serviceHour, key: serviceHour.key.toLowerCase() }));
};

export const commerceDetailSerializer = (data: any): CommerceDetail => {
    const commerce = data.commerce;

    const serviceHours = (Object.keys(commerce.serviceHours) as (keyof ServiceHours)[]).reduce((prev, key) => {
        prev[key] = serviceHourListSerializer(commerce.serviceHours[key]);

        return prev;
    }, {} as ServiceHours);

    return {
        ...commerce,
        /* general */
        optionalAddress: commerce.optionalAddress !== '-' ? commerce.optionalAddress : '',
        globalRaiting: Number.parseFloat(commerce.globalRaiting ?? '0'),
        /* service */
        serviceHours,
        /* delivery */
        minAmountDelivery: Number.parseFloat(commerce.minAmountDelivery ?? '0'),
        deliveryArea: Number.parseFloat(commerce.deliveryArea ?? '0'),
        /* charge */
        applyCharge: ApplyChargeMap[commerce.applyCharge ?? 0],
    };
};
