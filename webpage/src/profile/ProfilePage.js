import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

import styled, { keyframes } from 'styled-components';
import { slideInLeft } from 'react-animations';
import Loader from '../loader/Loader'
import Tables from './profileComponents/Tables';
import { useTranslation } from 'react-i18next';

const openAnimation = keyframes`${slideInLeft}`;

const OpenDiv = styled.div`
  animation: 1s ${openAnimation};
`;


export default function ProfilePage() {
    const { t } = useTranslation();
    const { token } = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [userData, setUserData] = useState({
        login: '',
        tables: []
    })
    const getUserData = useCallback(async (controller) => {
        try {
            var data = await request('/auth/getUserData', 'GET', null, { token: token }, controller.signal)
        } catch (e) {
            if (e.name != 'AbortError') {
                throw e
            }
            return
        }
        setUserData({
            login: data.login,
            tables: data.tables
        })

    }, [token])

    useEffect(() => {
        let controller = new AbortController();
        getUserData(controller)
        return (() => {
            controller.abort()
        })
    }, [getUserData])
    if (userData.login == '') {
        return <Loader />
    }
    function drawTables() {
        if (userData.tables.length) {
            return <><h2>{t("profile.tables")}:</h2>
                <OpenDiv>
                    <Tables tables={userData.tables} />
                </OpenDiv></>
        } else {
            return <OpenDiv className='no-data profile'>
                <h2>{t("profile.no-votes")}</h2>
                <span className="material-symbols-outlined material-icons">
                    mood_bad
                </span>
            </OpenDiv >
        }
    }
    return (
        <div className='profile'>
            <h1>{t("profile.hello")} {userData.login}</h1>
            <div className='tables'>

                {
                    drawTables()
                }

            </div>
            <Link to='/table' className='new-table'>
                <div className='new-table-href'>
                    {t("profile.new-table")}
                </div>
            </Link>
        </div >
    )
}
