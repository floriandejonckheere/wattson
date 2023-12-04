import { ReactElement, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useLocalStorage } from '@uidotdev/usehooks'

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

export default function App(): ReactElement {
  const [token] = useLocalStorage('token', null)
  const location = useLocation()

  useEffect(() => {
    import('preline/preline')
  }, [])

  useEffect(() => {
    // @ts-expect-error - copied from preline's framework guide
    HSStaticMethods.autoInit()
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/overview" />} />

      <Route element={<Authentication render={!token} path="/overview" />}>
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
  )
}
