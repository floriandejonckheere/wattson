import { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import {
  BoltIcon,
  HomeIcon,
  ChartBarIcon,
  LightBulbIcon
} from '@heroicons/react/24/solid'

function Dashboard(): ReactElement {
  return (
    <div className="bg-gray-50 dark:bg-slate-900">
      <div
        id="application-sidebar-dark"
        className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-gray-900 border-e border-gray-800 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500"
      >
        <div className="px-6">
          <a
            className="flex-none text-xl font-semibold text-white focus:outline-none focus:ring-1 focus:ring-gray-600"
            href="#"
            aria-label="Brand"
          >
            <BoltIcon className="h-6 w-6 inline-block" />
            Wattson
          </a>
        </div>

        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
            <li>
              <a
                className="flex items-center gap-x-3 py-2 px-2.5 bg-gray-700 text-sm text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
                href="#"
              >
                <HomeIcon className="h-5 w-5" />
                Dashboard
              </a>
            </li>

            <li>
              <a
                className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white-300 focus:outline-none focus:ring-1 focus:ring-gray-600"
                href="#"
              >
                <ChartBarIcon className="h-5 w-5" />
                History
              </a>
            </li>
            <li>
              <a
                className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white-300 focus:outline-none focus:ring-1 focus:ring-gray-600"
                href="#"
              >
                <LightBulbIcon className="h-5 w-5" />
                Suggestions
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <Outlet />
    </div>
  )
}

export default Dashboard
