import { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import {
  BoltIcon,
} from '@heroicons/react/24/solid'

function Navigation(): ReactElement {
  return (
    <div className="flex flex-col w-full h-full">
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 bg-white text-sm border-b border-gray-200 dark:bg-gray-800">
        <nav className="w-full px-16 py-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
          <div className="flex items-center justify-between">
            <a className="inline-flex items-center gap-x-6 text-2xl font-bold dark:text-white" href="#">
                <BoltIcon className="h-12 w-12 p-2.5 bg-sky-700 text-white rounded-full" />
                Wattson
            </a>
          </div>
          <div id="navbar-image-and-text-1" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
              <a className="flex items-center justify-between gap-4 font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 font-semibold text-white leading-none dark:bg-white dark:text-gray-800">
                  JD
                </span>
                <div className="flex flex-col">
                  <span>John Doe</span>
                  <span className="text-gray-400">john.doe@example.com</span>
                </div>
              </a>
            </div>
          </div>
        </nav>
      </header>

      <Outlet />
    </div>
  )
}

export default Navigation
