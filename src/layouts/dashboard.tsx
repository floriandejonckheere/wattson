import { ReactElement } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import {
  Cog6ToothIcon,
  HomeIcon,
  ChartBarIcon,
  LightBulbIcon
} from '@heroicons/react/24/solid'

import { me } from '../api/users'

export default function Dashboard(): ReactElement {
  const { isPending, isError, data } = useQuery({
    queryKey: ['me'],
    queryFn: me
  })

  const hour = new Date().getHours()

  let moment
  switch (true) {
    case hour < 6:
      moment = 'night'
      break
    case hour < 12:
      moment = 'morning'
      break
    case hour < 18:
      moment = 'afternoon'
      break
    case hour < 24:
      moment = 'evening'
  }

  return (
    <div className="flex flex-row w-full h-full bg-gray-50 dark:bg-slate-900">
      <div
        id="application-sidebar-dark"
        className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden top-0 start-0 bottom-0 z-[60] w-80 bg-sky-700 pt-4 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500"
      >
        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/overview"
                className={({ isActive }) =>
                  `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 ${
                    isActive
                      ? 'bg-sky-900'
                      : 'hover:bg-sky-900 hover:text-white-300'
                  }`
                }
              >
                <HomeIcon className="h-5 w-5" />
                Overview
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/history"
                className={({ isActive }) =>
                  `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 ${
                    isActive
                      ? 'bg-sky-900'
                      : 'hover:bg-sky-900 hover:text-white-300'
                  }`
                }
              >
                <ChartBarIcon className="h-5 w-5" />
                History
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/suggestions"
                className={({ isActive }) =>
                  `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 ${
                    isActive
                      ? 'bg-sky-900'
                      : 'hover:bg-sky-900 hover:text-white-300'
                  }`
                }
              >
                <LightBulbIcon className="h-5 w-5" />
                Suggestions
              </NavLink>
            </li>
            {!isPending && !isError && data.is_admin && (
              <li>
                <NavLink
                  to="/administration"
                  className={({ isActive }) =>
                    `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 ${
                      isActive
                        ? 'bg-sky-900'
                        : 'hover:bg-sky-900 hover:text-white-300'
                    }`
                  }
                >
                  <Cog6ToothIcon className="h-5 w-5" />
                  Administration
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <div className="p-5">
        <h1 className="text-3xl font-bold mb-10">
          Good {moment}, {!isPending && !isError && data.username}!
        </h1>

        <Outlet />
      </div>
    </div>
  )
}
