import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainRouterLinkEn from './MainRouterLinkEn';

export default function RouterLink() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<MainRouterLinkEn />} />
            </Routes>
        </BrowserRouter>
    )
}