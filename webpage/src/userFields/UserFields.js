import React from 'react'
import UserField from './UserField'

export default function UserFields({userFields,deleteUserField}) {
    return (
    <div>
        {userFields.map(userField=>{
            return <UserField key={userField.id} field={userField} deleteUserField={deleteUserField}/>
        })}
    </div>
  )
}
