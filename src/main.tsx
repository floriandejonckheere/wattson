import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { useLocalStorage } from '@uidotdev/usehooks'
import { AxiosError } from 'axios'
// @ts-expect-error - including @types/react-dom gives a lot of errors
import { createRoot } from 'react-dom/client'

import 'preline'

import './math'

import './main.css'

import Authentication from './authentication'

import Dashboard from './layouts/dashboard'
import Navigation from './layouts/navigation'

import Administration from './pages/administration'
import History from './pages/history'
import Overview from './pages/overview'
import Settings from './pages/settings'
import Suggestions from './pages/suggestions'

import Signin from './pages/auth/signin'
import Signup from './pages/auth/signup'
import { ThemeProvider } from './themeContext'

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
      <ThemeProvider>
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

              <Route
                element={<Authentication render={!!token} path="/signin" />}
              >
                <Route element={<Navigation />}>
                  <Route element={<Dashboard />}>
                    <Route path="/overview" element={<Overview />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/suggestions" element={<Suggestions />} />
                    <Route
                      path="/administration"
                      element={<Administration />}
                    />
                    <Route path="/settings" element={<Settings />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(<App />)
