import React, { useState } from 'react'
import Field from './Field'

export default function JSONFields({ fields,saveNewFields}) {
    function drawTable() {
        if (fields.length > 0) {
            return (<table>
                <thead>
                <tr>
                    <th>Наименование</th>
                    <th>Заголовок</th>
                    <th>Показывать</th>
                    <th>Сортировать</th>
                </tr>
                </thead>
                <tbody>
                {fields.map(field => {
                    return <Field key={field.id} field={field} saveNewFields={saveNewFields} />
                })}
                </tbody>
            </table>)
        }else{
            return <></>
        }
    }

    return (
        <div>
            {drawTable()}
        </div>
    )
}
