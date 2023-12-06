import { ReactElement } from 'react'

import {
  BellIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ShieldExclamationIcon
} from '@heroicons/react/24/outline'

import { BoltIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'

import { ALERTS } from '../api/data'

export default function EnergyAlertsPopover(): ReactElement {
  return (
    <div className="hs-dropdown relative inline-flex">
      <button
        id="hs-dropdown-default"
        type="button"
        className="hs-dropdown-toggle py-4 px-3 inline-flex items-center gap-x-2 text-sm rounded-lg font-medium text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      >
        <BellIcon className="w-5 h-5" />
      </button>

      <div
        className="hs-dropdown-menu relative flex flex-col transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
        aria-labelledby="hs-dropdown-default"
      >
        <div className="absolute -top-4 left-2 w-0 h-0 border-l-[20px] border-l-transparent border-b-[30px] border-b-sky-700 border-r-[20px] border-r-transparent"></div>
        <div className="flex gap-3 items-center px-6 py-4 text-white bg-sky-700 rounded-t-lg">
          <BoltIcon className="w-5 h-5 text-yellow-400" />
          <div className="text-sm font-bold text-white">Energy Alerts</div>
          <a href="#" className="float-right ml-auto">
            <Cog6ToothIcon className="w-6 h-6" />
          </a>
        </div>
        {ALERTS.map((alert, index) => (
          <a
            href="#"
            className={`flex flex-col transition-all hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 ${
              alert.unread && 'bg-sky-50 hover:bg-sky-100'
            } ${
              alert.type === 'info'
                ? 'border-l-4 border-sky-700'
                : alert.type === 'warning'
                  ? 'border-l-4 border-yellow-400'
                  : 'border-l-4 border-red-600'
            } ${index == ALERTS.length - 1 && 'rounded-b-lg'}`}
          >
            <div className="flex items-center p-4 md:p-5">
              <span className="flex me-5">
                {(alert.type === 'info' && (
                  <InformationCircleIcon className="w-10 h-10" />
                )) ||
                  (alert.type === 'warning' && (
                    <ShieldExclamationIcon className="w-10 h-10" />
                  )) ||
                  (alert.type === 'error' && (
                    <ExclamationTriangleIcon className="w-10 h-10" />
                  ))}

                <span className="ms-5">
                  <span className="block font-medium text-gray-800 dark:text-gray-200">
                    {alert.title}
                  </span>
                  <span className="block text-sm text-gray-500 w-80">
                    {alert.message}
                  </span>
                </span>
              </span>
              {alert.unread && (
                <span className="w-2 h-2 bg-sky-700 rounded-full"></span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
