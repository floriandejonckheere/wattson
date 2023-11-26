import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
// @ts-expect-error - including @types/react-dom gives a lot of errors
import { createRoot } from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
  QueryCache
} from '@tanstack/react-query'
import { useLocalStorage } from '@uidotdev/usehooks'
import { AxiosError } from 'axios'

import 'preline'

import './math'

import './main.css'

import Authentication from './authentication'

import Dashboard from './layouts/dashboard'
import Navigation from './layouts/navigation'

import Overview from './pages/overview'
import History from './pages/history'
import Suggestions from './pages/suggestions'
import Administration from './pages/administration'
import Settings from './pages/settings'

import Signin from './pages/auth/signin'
import Signup from './pages/auth/signup'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false
    }
  },
  queryCache: new QueryCache({
    // @ts-expect-error - axios error type is not compatible with react-query
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/signin'
      }
    }
  })
})

const App = () => {
  const [token] = useLocalStorage('token', null)

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/overview" />} />

            <Route
              element={<Authentication render={!token} path="/overview" />}
            >
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            <Route element={<Authentication render={!!token} path="/signin" />}>
              <Route element={<Navigation />}>
                <Route element={<Dashboard />}>
                  <Route path="/overview" element={<Overview />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/suggestions" element={<Suggestions />} />
                  <Route path="/administration" element={<Administration />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(<App />)
