import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import 'preline'

import './main.css'

import Dashboard from './layouts/dashboard'
import Navigation from './layouts/navigation'

import Overview from './pages/overview'
import History from './pages/history'
import Suggestions from './pages/suggestions'
import Administration from './pages/administration'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/overview" />} />
        <Route element={<Navigation />}>
          <Route element={<Dashboard />}>
            <Route path="/overview" element={<Overview />} />
            <Route path="/history" element={<History />} />
            <Route path="/suggestions" element={<Suggestions />} />
            <Route path="/administration" element={<Administration />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
