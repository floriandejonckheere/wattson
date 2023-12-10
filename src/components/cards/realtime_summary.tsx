import { ReactElement } from 'react'

import { useRealtimeSummary } from '../../api/queries/realtime_summary'

export default function RealtimeSummary(): ReactElement {
  const { isSuccess, summary } = useRealtimeSummary()

  return (
    <div className="flex flex-col gap-8 bg-white rounded-lg shadow p-7 dark:bg-slate-700 transition-all duration-500">
      <div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Real-time summary
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          What's going on at the moment
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-500 dark:text-slate-400 font-semibold">
          Total power
        </h4>
        <p className="mt-2 text-center text-5xl text-sky-700 font-bold dark:text-gray-200">
          {isSuccess ? Math.round(summary.totalPower) : '--'} W
        </p>
      </div>

      <div className="flex justify-between">
        <div>
          <h5 className="text-sm text-gray-500 dark:text-slate-400 font-semibold">
            Voltage
          </h5>
          <p className="mt-1 text-3xl font-bold dark:text-slate-300">
            {isSuccess ? summary.voltage.toFixed(1) : '--'}{' '}
            <span className="text-xl">V</span>
          </p>
        </div>
        <div className="text-right">
          <h5 className="text-sm text-gray-500 font-semibold dark:text-slate-400">
            Current
          </h5>
          <p className="mt-1 text-3xl font-bold dark:text-slate-300">
            {isSuccess ? summary.current.toFixed(1) : '--'}{' '}
            <span className="text-xl">A</span>
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <h5 className="text-sm text-gray-500 font-semibold dark:text-slate-400">
            Predicted energy price
          </h5>
          <p className="mt-1 text-3xl font-bold flex items-center dark:text-slate-300">
            {isSuccess ? (summary.energyPrice / 10).toFixed(2) : '--'}&nbsp;
            <span className="text-xl">c&euro;/kWh</span>
          </p>
          <p className="text-xs text-gray-400 dark:text-slate-400">Today</p>
        </div>
        <div className="text-right">
          <h5 className="text-sm text-gray-500 font-semibold dark:text-slate-400">
            Predicted energy cost
          </h5>
          <p className="mt-1 text-3xl font-bold flex justify-end items-center dark:text-slate-300">
            {isSuccess ? (summary.energyCost / 100).toFixed(2) : '--'}&nbsp;
            <span className="text-xl">c&euro;/h</span>
          </p>
          <p className="text-xs text-gray-400 dark:text-slate-400">Today</p>
        </div>
      </div>
    </div>
  )
}
