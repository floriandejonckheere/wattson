import { ReactElement } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useLocalStorage } from '@uidotdev/usehooks'

import { BoltIcon } from '@heroicons/react/24/solid'

import { me } from '../api/users'

export default function Navigation(): ReactElement {
  const { isPending, isError, data } = useQuery({
    queryKey: ['me'],
    queryFn: me
  })

  const [, setToken] = useLocalStorage('token', null)

  return (
    <div className="flex flex-col w-full h-full">
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 bg-white text-sm border-b border-gray-200 dark:bg-gray-800">
        <nav className="w-full px-16 py-4 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-x-6 text-3xl font-bold dark:text-white"
            >
              <BoltIcon className="h-12 w-12 p-2.5 bg-sky-700 text-white rounded-full" />
              Wattson
            </Link>
          </div>
          <div
            id="navbar-image-and-text-1"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
          >
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
              <Link
                to="/settings"
                className="flex items-center justify-between gap-4 font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 font-semibold text-white leading-none dark:bg-white dark:text-gray-800">
                  {!isPending &&
                    !isError &&
                    data.username.charAt(0).toUpperCase()}
                </span>
                <div className="flex flex-col">
                  <span>{!isPending && !isError && data.username}</span>
                  <span className="text-gray-400">
                    {!isPending && !isError && data.email}
                  </span>
                </div>
              </Link>
              <a
                className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-sky-700 sm:border-s sm:border-gray-300 sm:my-6 sm:ps-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500"
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
