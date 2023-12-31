import { ReactElement } from 'react'

import Spinner from '../spinner'

import { useBatteryStatus } from '../../api/queries/battery_status'

const Circle = ({ value }: { value: number }): ReactElement => (
  <span className="relative h-40 w-40">
    <svg
      className="h-full w-full"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="18"
        cy="18"
        r="16"
        fill="none"
        className="stroke-current text-gray-200 dark:text-gray-600"
        strokeWidth="2"
      />
      <g className="origin-center -rotate-90 transform">
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-sky-700 dark:text-sky-700"
          strokeWidth="2"
          strokeDasharray="100"
          strokeDashoffset={100 - value}
        />
      </g>
    </svg>
    <span className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2 -mt-2">
      <span className="text-center text-2xl font-bold text-gray-800 dark:text-gray-200">
        {value}%
      </span>
    </span>
  </span>
)

export default function BatteryStatus(): ReactElement {
  const { isSuccess, status } = useBatteryStatus()

  return (
    <div className="flex flex-col gap-8 bg-white rounded-lg shadow p-7 dark:bg-slate-700 transition-all duration-500">
      <div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Battery status
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          State of charge and power flow
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-500 dark:text-slate-400 font-semibold">
          Charging status
        </h4>
        <p className="flex justify-center mt-2 text-5xl text-sky-700 font-bold dark:text-gray-200">
          {isSuccess ? <Circle value={status.charge} /> : <Spinner />}
        </p>
      </div>

      <div className="flex justify-between">
        <div>
          <h5 className="text-sm text-gray-500 font-semibold dark:text-slate-400">
            Battery capacity
          </h5>
          <p className="mt-1 text-3xl font-bold flex items-center dark:text-slate-300">
            {isSuccess ? (status.capacity / 1000).toFixed(1) : '--'}&nbsp;
            <span className="text-xl">kWh</span>
          </p>
        </div>
        <div className="text-right">
          <h5 className="text-sm text-gray-500 font-semibold dark:text-slate-400">
            Battery health
          </h5>
          <p className="mt-1 text-3xl font-bold flex justify-end items-center dark:text-slate-300">
            {isSuccess ? status.health : '--'}&nbsp;
            <span className="text-xl">%</span>
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <h5 className="text-sm text-gray-500 font-semibold dark:text-slate-400">
            Total energy charged
          </h5>
          <p className="mt-1 text-3xl font-bold flex items-center dark:text-slate-300">
            {isSuccess ? Math.round(status.charged / 1000 ** 2 / 3600) : '--'}
            &nbsp;
            <span className="text-xl">kWh</span>
          </p>
          <p className="text-xs text-gray-400 dark:text-slate-400">
            As of yesterday
          </p>
        </div>
        <div className="text-right">
          <h5 className="text-sm text-gray-500 font-semibold dark:text-slate-400">
            Total energy discharged
          </h5>
          <p className="mt-1 text-3xl font-bold flex justify-end items-center dark:text-slate-300">
            {isSuccess ? Math.round(status.charged / 1000 ** 2 / 3600) : '--'}
            &nbsp;
            <span className="text-xl">kWh</span>
          </p>
          <p className="text-xs text-gray-400 dark:text-slate-400">
            As of yesterday
          </p>
        </div>
      </div>
    </div>
  )
}
