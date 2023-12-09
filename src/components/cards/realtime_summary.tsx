import { ReactElement } from 'react'

export default function RealtimeSummary(): ReactElement {
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
          2000 W
        </p>
      </div>

      <div className="flex justify-between">
        <div>
          <h5 className="text-sm text-gray-500 dark:text-slate-400 font-semibold">
            Voltage
          </h5>
          <p className="mt-1 text-3xl font-bold dark:text-slate-300">
            237 <span className="text-xl">V</span>
          </p>
        </div>
        <div className="text-right">
          <h5 className="text-sm text-gray-500 font-semibold dark:text-slate-400">
            Current
          </h5>
          <p className="mt-1 text-3xl font-bold dark:text-slate-300">
            8.44 <span className="text-xl">A</span>
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <h5 className="text-sm text-gray-500 font-semibold dark:text-slate-400">
            Predicted energy price
          </h5>
          <p className="mt-1 text-3xl font-bold flex items-center dark:text-slate-300">
            15.71&nbsp;
            <span className="text-xl">c&euro;/kWh</span>
            <span className="mx-2 px-1.5 py-1 rounded-sm text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
              &#9650; 8%
            </span>
          </p>
          <p className="text-xs text-gray-400 dark:text-slate-400">
            Since yesterday
          </p>
        </div>
        <div className="text-right">
          <h5 className="text-sm text-gray-500 font-semibold dark:text-slate-400">
            Predicted energy cost
          </h5>
          <p className="mt-1 text-3xl font-bold flex items-center dark:text-slate-300">
            0.31&nbsp;
            <span className="text-xl">&euro;/h</span>
            <span className="mx-2 px-1.5 py-1 rounded-sm text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              &#9660; 75%
            </span>
          </p>
          <p className="text-xs text-gray-400 dark:text-slate-400">
            Since yesterday
          </p>
        </div>
      </div>
    </div>
  )
}
