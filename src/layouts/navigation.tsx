import { useQuery } from '@tanstack/react-query'
import { useLocalStorage } from '@uidotdev/usehooks'
import { ReactElement } from 'react'
import { Link, Outlet } from 'react-router-dom'

import { BoltIcon, MoonIcon, SunIcon } from '@heroicons/react/24/solid'

import { me } from '../api/users'
import { useTheme } from '../themeContext'

export default function Navigation(): ReactElement {
  const { isPending, isError, data } = useQuery({
    queryKey: ['me'],
    queryFn: me
  })

  const [, setToken] = useLocalStorage('token', null)
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <div className="flex flex-col w-full h-full">
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 bg-white text-sm border-b border-gray-200 dark:bg-slate-800 dark:border-slate-900 transition-all duration-500">
        <nav className="w-full px-16 py-4 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-x-6 text-3xl font-bold dark:text-slate-200 dark:hover:text-slate-100"
            >
              <BoltIcon className="h-12 w-12 p-2.5 bg-sky-700 text-white rounded-full" />
              Wattson
            </Link>
          </div>
          <div
            id="navbar-image-and-text-1"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
          >
            <div className="flex flex-col gap-10 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
              <Link
                to="/settings"
                className="flex items-center justify-between gap-4 font-medium text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-100"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 font-semibold text-white leading-none dark:bg-slate-200 dark:text-gray-800">
                  {!isPending &&
                    !isError &&
                    data.username.charAt(0).toUpperCase()}
                </span>
                <div className="flex flex-col">
                  <span>{!isPending && !isError && data.username}</span>
                  <span className="text-gray-400 dark:text-slate-500">
                    {!isPending && !isError && data.email}
                  </span>
                </div>
              </Link>
              <div className="relative inline-block">
                <input
                  type="checkbox"
                  id="hs-large-switch-soft-with-icons"
                  className="peer relative shrink-0 w-[4.25rem] h-9 p-px bg-gray-100 border border-gray-200 text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-0 ring-transparent disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-sky-700 checked:border-sky-500 focus:ring-offset-0 focus:ring-transparent dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-800/30 dark:checked:border-blue-800 before:inline-block before:w-8 before:h-8 before:bg-white checked:before:bg-blue-600 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-sky-700"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
                <label
                  htmlFor="hs-large-switch-soft-with-icons"
                  className="sr-only"
                >
                  switch
                </label>
                <span className="peer-checked:text-sky-700 text-gray-500 w-8 h-8 absolute top-0.5 start-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
                  <SunIcon className="h-4 w-4" />
                </span>
                <span className="peer-checked:text-white w-8 h-8 absolute top-0.5 end-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
                  <MoonIcon className="h-4 w-4" />
                </span>
              </div>
              <a
                className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-sky-700 sm:border-s sm:border-gray-300 sm:my-6 sm:ps-6 dark:border-gray-700 dark:text-slate-300 dark:hover:text-blue-500"
                href="#"
                onClick={() => {
                  setToken(null)
                }}
              >
                Sign out
              </a>
            </div>
          </div>
        </nav>
      </header>

      <Outlet />
    </div>
  )
}
