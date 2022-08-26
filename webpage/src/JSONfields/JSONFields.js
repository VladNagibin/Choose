import React from 'react'
import { useTranslation } from 'react-i18next';
import Field from './Field'

export default function JSONFields({ fields }) {
    const { t } = useTranslation();
    function drawTable() {
        if (fields.length > 0) {
            return (<div className='fields'><h2>{t("new-table.JSON-settings.JSON-field.h2")}</h2><table>
                <thead>
                    <tr>
                        <th>{t("new-table.JSON-settings.JSON-field.name")}</th>
                        <th>{t("new-table.JSON-settings.JSON-field.header")}</th>
                        <th>{t("new-table.JSON-settings.JSON-field.show")}</th>
                        <th>{t("new-table.JSON-settings.JSON-field.sort")}</th>
                        <th>{t("new-table.JSON-settings.JSON-field.key")}</th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map(field => {
                        return <Field key={field.id} field={field} />
                    })}
                </tbody>
            </table></div>)
        } else {
            return <></>
        }
    }

    return (
        <div>
            {drawTable()}
        </div>
    )
}
