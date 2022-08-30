import React from 'react'
import { useClipboard } from 'use-clipboard-copy'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Table({ table }) {
    const clipboard = useClipboard()
    const { t } = useTranslation();
    return (
        <div key={table.id} className='table'>
            <Link to={'/table/' + table.id} >
                <div>{table.name}
                </div>
                <div>{t("profile.cards-chosen")}: {table.peopleVote}
                </div>
            </Link>
            <div className='table-right'>
                <input ref={clipboard.target} value={'http://choose-votes.ru/table/' + table.id} readOnly></input>
                <button title='Скопировать' onClick={() => {
                    clipboard.copy()
                    toast.info(t("notifications.copied"))
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
