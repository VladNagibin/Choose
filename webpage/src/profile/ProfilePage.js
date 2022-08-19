import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useClipboard} from 'use-clipboard-copy'
import { toast } from 'react-toastify';

export default function ProfilePage() {
    const { token } = useContext(AuthContext)
    const { request } = useHttp()
    const [userData, setUserData] = useState({
        login: '',
        tables: []
    })
    const clipboard = useClipboard()
    async function getUserData() {
        var data = await request('/auth/getUserData', 'GET', null, { token: token })
        setUserData({
            login: data.login,
            tables: data.tables
        })
        console.log({
            login: data.login,
            tables: data.tables
        })
    }
    useEffect(() => {
        getUserData()
    }, [])
    return (
        <div className='profile'>
            <h1>Здравствуйте {userData.login}</h1>
            <div className='tables'>
                <h2>Ваши таблицы:</h2>
                {
                    userData.tables.map(table => {
                        return <div className='table'>
                            <Link to={'/table/' + table.id} key={table.id}>
                                <div>{table.name}
                                </div>
                                <div>Карточек выбрано: {table.peopleVote}
                                </div>
                            </Link>
                            <div className='table-right'>
                                <input ref={clipboard.target} value={'http://localhost:3000/table/'+table.id} readOnly></input>
                                <button onClick={()=>{
                                    clipboard.copy()
                                    toast.info('Ссылка скопирована')}}>Скопировать ссылку</button>
                            </div>
                        </div>
                    })
                }

            </div>
            
        </div>
    )
}
