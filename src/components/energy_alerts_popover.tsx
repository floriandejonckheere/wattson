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
        className="relative hs-dropdown-toggle py-4 px-3 inline-flex items-center gap-x-2 text-sm rounded-lg font-medium text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      >
        <BellIcon className="w-5 h-5" />
        {ALERTS.some((alert) => alert.unread) && (
          <div className="absolute right-1.5 bottom-1.5 w-2 h-2 rounded-full bg-red-700 dark:bg-white"></div>
        )}
      </button>

      <div
        className="hs-dropdown-menu relative flex flex-col transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full z-50"
        aria-labelledby="hs-dropdown-default"
      >
        <div className="absolute -top-4 left-2 w-0 h-0 border-l-[20px] border-l-transparent border-b-[30px] border-b-sky-700 dark:border-b-sky-800 border-r-[20px] border-r-transparent"></div>
        <div className="flex gap-3 items-center px-6 py-4 text-white bg-sky-700 rounded-t-lg dark:bg-sky-800">
          <BoltIcon className="w-5 h-5 text-yellow-400" />
          <div className="text-sm font-bold">Energy Alerts</div>
          <a
            href="#"
            className="hs-tooltip hs-tooltip-toggle float-right ml-auto"
          >
            <Cog6ToothIcon className="w-6 h-6" />
            <span
              className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-white"
              role="tooltip"
            >
              Alert settings
            </span>
          </a>
        </div>
        {ALERTS.map((alert) => (
          <a
            key={alert.id}
            href="#"
            className={`flex flex-col transition-all last:rounded-b-lg ${
              alert.unread
                ? 'bg-sky-50 hover:bg-sky-100 dark:bg-slate-600 dark:hover:bg-slate-500'
                : 'bg-white hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-500'
            } ${
              alert.type === 'info'
                ? 'border-l-4 border-sky-700'
                : alert.type === 'warning'
                  ? 'border-l-4 border-yellow-400'
                  : 'border-l-4 border-red-600 dark:border-l-4 dark:border-red-800'
            }`}
          >
            <div className="flex items-center p-4 md:p-5">
              <span className="flex items-center me-5">
                {(alert.type === 'info' && (
                  <InformationCircleIcon className="w-10 h-10 dark:text-gray-200" />
                )) ||
                  (alert.type === 'warning' && (
                    <ShieldExclamationIcon className="w-10 h-10 dark:text-gray-200" />
                  )) ||
                  (alert.type === 'error' && (
                    <ExclamationTriangleIcon className="w-10 h-10 dark:text-gray-200" />
                  ))}

                <span className="ms-5">
                  <span className="block font-medium text-gray-800 dark:text-gray-200">
                    {alert.title}
                  </span>
                  <span className="block text-sm text-gray-500 w-80 dark:text-gray-400">
                    {alert.message}
                  </span>
                </span>
              </span>
              {alert.unread && (
                <a
                  href="#"
                  className="hs-tooltip hs-tooltip-toggle p-4"
                  title="Mark as read"
                >
                  <div className="w-2 h-2 rounded-full bg-sky-700 dark:bg-white"></div>
                  <span
                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-white text-sm"
                    role="tooltip"
                  >
                    Mark as read
                  </span>
                </a>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
