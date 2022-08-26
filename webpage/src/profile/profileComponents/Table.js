import React from 'react'
import { useClipboard } from 'use-clipboard-copy'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Table({ table }) {
    const clipboard = useClipboard()
    
    return (
        <div key={table.id} className='table'>
            <Link to={'/table/' + table.id} >
                <div>{table.name}
                </div>
                <div>Карточек выбрано: {table.peopleVote}
                </div>
            </Link>
            <div className='table-right'>
                <input ref={clipboard.target} value={'http://choose-votes.ru/table/' + table.id} readOnly></input>
                <button title='Скопировать' onClick={() => {
                    clipboard.copy()
                    toast.info('Ссылка скопирована')
                }}><span className="material-symbols-outlined material-icons">
                        content_copy
                    </span></button>
                <Link to={'/table/' + table.id} title='Открыть'><span className="material-symbols-outlined material-icons">
                    open_in_new
                </span></Link>
            </div>
        </div>
    )
}
