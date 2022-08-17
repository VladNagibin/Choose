import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import TablePage from "./tablePage/TablePage";
import LoginPage from './auth/LoginPage'
import RegistrationPage from './auth/RegistrationPage'
import NewTablePage from "./settings/NewTablePage";
import MainPage from "./mainPage/MainPage";

export const useRoutes = isAunteficated => {
    if (isAunteficated) {
        return (   
        <Routes>
            <Route path="/" exact element={<MainPage/>}/>
            <Route path="/table" exact element={<NewTablePage/>}/>
            <Route path="/table/:id" element={<TablePage/>}/>
            <Route path="*" element={<Navigate replace to="/" />}  />
        </Routes>
    )

    } else {
        return (
        <Routes>
            <Route path="/" exact element={<MainPage />} />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/registration" exact element={<RegistrationPage />} />
            <Route path="/table/:id" element={<TablePage/>}/>
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
        )
    }

}