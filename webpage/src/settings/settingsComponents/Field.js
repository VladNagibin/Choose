import React from 'react'

export default function Field({field,saveNewFields}) {
    // console.log(field.name)
    
    return (
    <tr id={field.id}>
      <td>{field.name}</td>
      <td><input type='text' name='header'></input></td>
      <td><input type='checkbox' name='show'></input></td>
      <td><input type='checkbox' name='sort'></input></td>
    </tr>
  )
}
