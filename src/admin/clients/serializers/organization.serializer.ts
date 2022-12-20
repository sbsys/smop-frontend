import { OrganizationDetail } from '../types';

export const organizationDetailSerializer = (data: any): OrganizationDetail => {
    const org = data.organization;

    return {
        ...org,
        commerces:
            org.commerces?.map((commerce: any) => ({
                ...commerce,
                minAmountDelivery: Number.parseFloat(commerce.minAmountDelivery ?? '0'),
                typeCharge:
                    commerce.typeCharge?.map((charge: any) => ({
                        ...charge,
                        value: Number.parseFloat(charge.value ?? '0'),
                    })) ?? [],
            })) ?? [],
    };
};
