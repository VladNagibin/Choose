import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import TablePage from "./tablePage/TablePage";
import LoginPage from './auth/LoginPage'
import RegistrationPage from './auth/RegistrationPage'
import NewTablePage from "./settings/NewTablePage";
import MainPage from "./mainPage/MainPage";
import ProfilePage from './profile/ProfilePage'
import DocsPage from "./docs/DocsPage";

export const useRoutes = isAunteficated => {
    if (isAunteficated) {
        return (   
        <Routes>
            <Route path="/" exact element={<MainPage/>}/>
            <Route path="/profile" exact element={<ProfilePage/>}/>
            <Route path="/table" exact element={<NewTablePage/>}/>
            <Route path="/table/:id" element={<TablePage/>}/>
            <Route path="/docs/:page" element={<DocsPage/>}/>
            <Route path="*" element={<Navigate replace to="/" />}  />
        </Routes>
    )

    } else {
        return (
        <Routes>
            <Route path="/" exact element={<MainPage />} />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/table" exact element={<Navigate replace to="/registration" />}/>
            <Route path="/registration" exact element={<RegistrationPage />} />
            <Route path="/table/:id" element={<TablePage/>}/>
            <Route path="/docs/:page" element={<DocsPage/>}/>
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
        )
    }

}