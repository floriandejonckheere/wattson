import { ReactElement } from 'react'

import { BoltIcon } from '@heroicons/react/24/solid'

import { ALERTS } from '../../api/data'
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ShieldExclamationIcon
} from '@heroicons/react/24/outline'

export default function EnergyAlerts(): ReactElement {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg shadow p-7 dark:bg-slate-700">
      <div className="mb-6">
        <h3 className="flex gap-3 items-center text-xl font-bold text-gray-600 dark:text-gray-200 mb-2">
          <BoltIcon className="w-5 h-5 text-yellow-400" />
          Energy alerts
        </h3>
      </div>
      {ALERTS.map((alert) => (
        <div
          key={alert.id}
          className={`flex flex-col transition-all rounded-lg ${
            alert.unread
              ? 'bg-sky-50 dark:bg-slate-600'
              : 'bg-white dark:bg-slate-700'
          } ${
            alert.type === 'info'
              ? 'text-sky-700'
              : alert.type === 'warning'
                ? 'text-yellow-400'
                : 'text-red-400'
          }`}
        >
          <div className="flex items-center p-4 md:p-5">
            <span className="flex items-center me-5">
              {(alert.type === 'info' && (
                <InformationCircleIcon className="w-10 h-10 dark:text-gray-200" />
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
                <span className="block text-sm text-gray-500 dark:text-gray-400">
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
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-white"
                  role="tooltip"
                >
                  Mark as read
                </span>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
