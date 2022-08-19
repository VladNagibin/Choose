import React from 'react'

export default function Field({field}) {
    // console.log(field.name)
    
    return (
    <tr id={field.id}>
      <td>{field.name}</td>
      <td><input type='text' name='header'></input></td>
      <td><input className='custom-checkbox' id = {field.id+'1'} type='checkbox' name='show'></input><label htmlFor={field.id+'1'}></label></td>
      <td><input className='custom-checkbox' id = {field.id+'2'} type='checkbox' name='sort'></input><label htmlFor={field.id+'2'}></label></td>
      <td><input className='custom-radio' id = {field.id+'3'} type='radio' name='key' value={field.name}></input><label htmlFor={field.id+'3'}></label></td>
    </tr>
  )
}
