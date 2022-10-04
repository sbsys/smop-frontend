import { OrganizationSettingsDTO } from '../types';

export const organizationSettingsSerializer = (data: any): OrganizationSettingsDTO => ({
    organizationId: data.settings.organizationId,
    ownerReference: data.settings.ownerReference,
    organizationName: data.settings.organizationName,
    multiLanguage: data.settings.multiLanguage,
    maxLangAllow: data.settings.maxLangAllow,
    decimals: data.settings.decimals,
    readySettings: data.settings.readySettings,
    internationalization: data.settings.internationalization.map((internationalization: any) => ({
        id: internationalization.id,
        abbreviation: internationalization.abbreviation,
        flagpng: internationalization.flagpng,
        flagsvg: internationalization.flagsvg,
        isAvailable: internationalization.isAvailable,
        preferredLanguage: internationalization.preferredLanguage,
    })),
    files: data.settings.files.map((file: any) => ({
        isCover: file.isCover,
        url: file.url,
    })),
});
