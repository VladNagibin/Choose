import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useClipboard } from 'use-clipboard-copy'
import { toast } from 'react-toastify';

import styled, { keyframes } from 'styled-components';
import { slideInLeft } from 'react-animations';
import Loader from '../loader/Loader'

const openAnimation = keyframes`${slideInLeft}`;
 
const OpenDiv = styled.div`
  animation: 1s ${openAnimation};
`;


export default function ProfilePage() {
    const { token } = useContext(AuthContext)
    const { request,loading } = useHttp()
    const [userData, setUserData] = useState({
        login: '',
        tables: []
    })
    const clipboard = useClipboard()
    const getUserData = useCallback(async (controller)=> {
        try{
            var data = await request('/auth/getUserData', 'GET', null, { token: token },controller.signal)
        }catch(e){
            if(e.name!='AbortError'){
                throw e
            }
            return
        }
        setUserData({
            login: data.login,
            tables: data.tables
        })
        
    },[token])
    
    useEffect(() => {
        let controller = new AbortController();
        getUserData(controller)
        return(()=>{
            controller.abort()
        })
    }, [getUserData])
    if(userData.login==''){
        return <Loader/>
    }
    function drawTables(){
        if(userData.tables.length){
            return <OpenDiv>{
                userData.tables.map(table => {
                    return <div key={table.id} className='table'>
                        <Link to={'/table/' + table.id} >
                            <div>{table.name}
                            </div>
                            <div>Карточек выбрано: {table.peopleVote}
                            </div>
                        </Link>
                        <div className='table-right'>
                            <input ref={clipboard.target} value={'http://localhost:3000/table/' + table.id} readOnly></input>
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
                })
            }</OpenDiv>
        }else{
            return <></>
        }
    }
    return (
        <div className='profile'>
            <h1>Здравствуйте {userData.login}</h1>
            <div className='tables'>
                <h2>Ваши таблицы:</h2>
                {
                    drawTables()
                }

            </div>
            <Link to='/table' className='new-table'>
                <div className='new-table-href'>
                    Создать новую таблицу
                </div>
            </Link>
        </div >
    )
}
