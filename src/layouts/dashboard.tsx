import { ReactElement } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {
  Cog6ToothIcon,
  HomeIcon,
  ChartBarIcon,
  LightBulbIcon
} from '@heroicons/react/24/solid'

function Dashboard(): ReactElement {
  return (
    <div className="flex flex-row w-full h-full bg-gray-50 dark:bg-slate-900">
      <div
        id="application-sidebar-dark"
        className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden top-0 start-0 bottom-0 z-[60] w-80 bg-sky-700 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500"
      >
        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
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
          </ul>
        </nav>
      </div>

      <div className="p-5">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
