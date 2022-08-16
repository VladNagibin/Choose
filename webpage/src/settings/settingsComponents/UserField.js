import React from 'react'

export default function UserField({ field, deleteUserField }) {
    function deleteField() {
        deleteUserField(field.id)
    }
    return (
        <div>
            <span>{field.name}</span>
            <span>{field.header}</span>
            <span>{field.type}</span>
            <button onClick={deleteField}>Удалить</button>
        </div>
    )
}
