import React from 'react'
import Field from './Field'

export default function JSONFields({ fields }) {
    function drawTable() {
        if (fields.length > 0) {
            return (<div className='fields'><h2>Настройте поля карточек</h2><table>
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
