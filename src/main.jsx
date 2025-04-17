import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.jsx'
import Login from './Login.jsx'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

const isAuthenticated = () => localStorage.getItem('isAuthenticated') === 'true'
const baseName = import.meta.env.BASE_URL || '/'

root.render(
    <React.StrictMode>
        <BrowserRouter basename={baseName}>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route
                    path="/*"
                    element={isAuthenticated() ? <App /> : <Navigate to="login" replace />}
                />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)