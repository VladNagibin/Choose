import React from 'react'

export default function UserField({ field, deleteUserField }) {
    function deleteField() {
        deleteUserField(field.id)
    }
    return (
        <div className='user-fields-added'>
            <div className='user-input'>{field.name}</div>
            <div className='user-input'>{field.header}</div>
            <div className='user-type'>{field.type}</div>
            <button className='user-button' onClick={deleteField}>Удалить</button>
        </div>
    )
}
