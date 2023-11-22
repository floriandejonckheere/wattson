import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import 'preline'

import './main.css'

import Dashboard from './layouts/dashboard'
import Navigation from './layouts/navigation'

import Overview from './pages/overview'
import History from './pages/history'
import Suggestions from './pages/suggestions'
import Administration from './pages/administration'

import Signin from './pages/auth/signin'
import Signup from './pages/auth/signup'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1
    }
  }
})

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/overview" />} />

          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

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
    </QueryClientProvider>
  </React.StrictMode>
)
