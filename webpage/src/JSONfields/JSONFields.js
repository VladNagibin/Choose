import React from 'react'
import Field from './Field'

export default function JSONFields({ fields }) {
    function drawTable() {
        if (fields.length > 0) {
            return (<><h1>Настройте поля карточек</h1><table>
                <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Заголовок</th>
                        <th>Показывать</th>
                        <th>Сортировать</th>
                        <th>Ключ</th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map(field => {
                        return <Field key={field.id} field={field} />
                    })}
                </tbody>
            </table></>)
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
