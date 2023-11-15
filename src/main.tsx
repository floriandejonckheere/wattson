import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import 'preline'

import './main.css'

import Dashboard from './layouts/dashboard'
import Overview from './pages/overview'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/overview" />} />
        <Route element={<Dashboard />}>
          <Route path="/overview" element={<Overview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
