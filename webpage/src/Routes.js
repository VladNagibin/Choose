import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import MainPage from "./mainPage/MainPage";
import SettingsPage from './settings/SettingsPage'


export const useRoutes = isAunteficated =>{
    return(
        <Routes>
            <Route path="/" exact element={<MainPage/>}/>
            <Route path="/settings" exact element={<SettingsPage/>}/>
            <Route path="*" element={<Navigate replace to="/" />}  />
        </Routes>
    )
}