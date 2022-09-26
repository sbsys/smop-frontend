/* props */
import { FieldSetProps, FilePreview } from 'admin/core';
import { useDragAndDropFiles } from 'shared/hooks';
import { TenantSettingsContextProps } from './TenantSettings.props';

export const useTenantSettings = () => {
    /* states */
    const [updateCoverFile, isCoverDragging] = useDragAndDropFiles();
    const [updateProfileFile, isProfileDragging] = useDragAndDropFiles();

    /* props */
    const updateCoverField: FieldSetProps = {
        field: { strategy: 'file', ...updateCoverFile, children: <FilePreview /> },
        isHintReserved: true,
        hint: {
            hasDots: true,
            children: isCoverDragging ? 'Dragging cover' : 'Cover photo',
        },
    };

    const updateProfileField: FieldSetProps = {
        field: { strategy: 'file', ...updateProfileFile, children: <FilePreview /> },
        isHintReserved: true,
        hint: {
            hasDots: true,
            children: isProfileDragging ? 'Dragging profile' : 'Profile photo',
        },
    };

    const formFields: FieldSetProps[] = [updateCoverField, updateProfileField];

    /* context */
    const context: TenantSettingsContextProps = {
        /* props */
        formFields,
    };

    return { context };
};
