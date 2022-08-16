import React from 'react'

export default function Field({field}) {
    // console.log(field.name)
    
    return (
    <tr id={field.id}>
      <td>{field.name}</td>
      <td><input type='text' name='header'></input></td>
      <td><input type='checkbox' name='show'></input></td>
      <td><input type='checkbox' name='sort'></input></td>
      <td><input type='radio' name='key' id='key' value={field.name}></input></td>
    </tr>
  )
}
