import React from 'react'
import { useTranslation } from 'react-i18next';

export default function UserField({ field, deleteUserField }) {
    const { t } = useTranslation();
    function deleteField() {
        deleteUserField(field.id)
    }
    return (
        <div className='user-fields-added'>
            <div className='user-input'>{field.name}</div>
            <div className='user-input'>{field.header}</div>
            <div className='user-type'>{field.type}</div>
            <button className='user-button' onClick={deleteField}>{t("new-table.JSON-settings.user-fields.delete-button")}</button>
        </div>
    )
}
