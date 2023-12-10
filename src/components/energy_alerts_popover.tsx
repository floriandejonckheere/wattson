import { ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  BellIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ShieldExclamationIcon
} from '@heroicons/react/24/outline'

import { BoltIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'

import { useAlerts } from '../contexts/alert'

export default function EnergyAlertsPopover(): ReactElement {
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState(false)

  const navigate = useNavigate()

  const { alerts, markAsRead } = useAlerts()

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        className="relative py-4 px-3 inline-flex items-center gap-x-2 text-sm rounded-lg font-medium text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        onClick={() => {
          setOpen(!open)
          setTimeout(() => setSettings(false), 500)
        }}
      >
        <BellIcon className="w-5 h-5" />
        {alerts.some((alert) => alert.unread) && (
          <div className="absolute right-1.5 bottom-1.5 w-2 h-2 rounded-full bg-red-700 dark:bg-white"></div>
        )}
      </button>

      <div
        className={`fixed left-0 top-0 w-full h-full bg-gray-100 z-40 opacity-0 ${
          open ? 'block' : 'hidden'
        }`}
        onClick={() => {
          setOpen(false)
          setTimeout(() => setSettings(false), 500)
        }}
      />
      <div
        className={`fixed top-24 w-[32rem] flex flex-col transition-[opacity,margin] duration min-w-[15rem] bg-white shadow-md rounded-lg mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full z-50 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute -top-4 left-2 w-0 h-0 border-l-[20px] border-l-transparent border-b-[30px] border-b-sky-700 dark:border-b-sky-800 border-r-[20px] border-r-transparent"></div>
        <div className="flex gap-3 items-center px-6 py-4 text-white bg-sky-700 rounded-t-lg dark:bg-sky-800">
          <BoltIcon className="w-5 h-5 text-yellow-400" />
          <div className="text-sm font-bold">Energy Alerts</div>
          <a
            href="#"
            className="hs-tooltip hs-tooltip-toggle float-right ml-auto"
            onClick={(e) => {
              e.preventDefault()
              setSettings(!settings)
            }}
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
        {settings ? (
          <div className="flex items-center justify-between p-4 md:p-5">
            <span>
              <span className="block font-medium text-gray-800 dark:text-gray-200">
                Notifications
              </span>
              <span className="block text-sm text-gray-500 dark:text-gray-400">
                Enable push notifications in your browser
              </span>
            </span>

            <div className="hs-tooltip hs-tooltip-toggle">
              <input
                type="checkbox"
                id="hs-basic-usage"
                className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-sky-700 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-sky-700 checked:border-sky-700 focus:checked:border-sky-700 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-sky-900 dark:checked:border-sky-900 dark:focus:ring-offset-gray-600 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-sky-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-sky-200"
              />
            </div>
          </div>
        ) : (
          alerts.map((alert) => (
            <a
              key={alert.id}
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setOpen(false)
                setSettings(false)
                markAsRead(alert)
                navigate('/suggestions')
              }}
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
              <div className="flex items-center justify-between p-4 md:p-5">
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
                    onClick={(e) => {
                      e.preventDefault()
                      markAsRead(alert)
                    }}
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
          ))
        )}
      </div>
    </div>
  )
}
