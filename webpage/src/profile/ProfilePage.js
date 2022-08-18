import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
export default function ProfilePage() {
    const { token } = useContext(AuthContext)
    const {request} = useHttp()
    const [userData,setUserData] = useState({
        login:'',
        tables:[]
    })
    async function getUserData(){
        var data = await request('/auth/getUserData','GET',null,{token:token})
        setUserData({
            login:data.login,
            tables:data.tables
        })
    } 
    useEffect(()=>{
        getUserData()
    },[])
    return (
        <div>
            Профиль {userData.login}
            {
                userData.tables.map(table=>{
                    return <Link key={table.id} to={'/table/'+table.id}>{table.name}</Link>
                })
            }
        </div>
    )
}
