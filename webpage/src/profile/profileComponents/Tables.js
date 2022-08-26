import React from 'react'
import Table from './Table'

export default function Tables({tables}) {
  return (
    <div>
      {tables.map(table=>{
        return <Table table={table}/>
      })}
    </div>
  )
}
