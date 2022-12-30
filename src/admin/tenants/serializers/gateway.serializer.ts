import { GatewayListItem } from '../types';

export const gatewayListSerializer = (data: any): GatewayListItem[] => {
    return (
        data?.gateways?.map((gateway: any) => ({
            ...gateway,
            keyBelongsCommerce:
                gateway.keyBelongsCommerce?.map((key: any) => ({
                    ...key,
                    commerceKeys: {
                        enseckeyId: key.commerce_keys?.fk_enseckey ?? '',
                        commerceId: key.commerce_keys?.fk_commerce ?? '',
                    },
                })) ?? [],
            createdAt: new Date(gateway.createdAt),
        })) ?? []
    );
};
