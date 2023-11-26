import { ReactElement, useState } from 'react'
import moment from 'moment'

import { SunIcon } from '@heroicons/react/24/outline'

import TemperatureChart from '../components/charts/temperature'

export default function Suggestions(): ReactElement {
  const [activeTab, setActiveTab] = useState('today')

  return (
    <>
      <h2 className="text-xl font-bold">Suggestions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-16">
        <div className="flex flex-col gap-8 bg-white rounded-lg shadow p-7 dark:bg-slate-900">
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Weather
            </h3>
            <div className="flex gap-3">
              <button
                className={`py-1.5 px-3 rounded-full text-xs font-medium ${
                  activeTab == 'today' && 'bg-blue-100 text-blue-800'
                }`}
                onClick={() => setActiveTab('today')}
              >
                Today
              </button>
              <button
                className={`py-1.5 px-3 rounded-full text-xs font-medium ${
                  activeTab == 'tomorrow' && 'bg-blue-100 text-blue-800'
                }`}
                onClick={() => setActiveTab('tomorrow')}
              >
                Tomorrow
              </button>
              <button
                className={`py-1.5 px-3 rounded-full text-xs font-medium ${
                  activeTab == 'this week' && 'bg-blue-100 text-blue-800'
                }`}
                onClick={() => setActiveTab('this week')}
              >
                This week
              </button>
            </div>
          </div>

          {activeTab == 'today' && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex gap-2 items-center">
                    <SunIcon className="inline-block w-8 h-8" />

                    <div>
                      <h5 className="text-sm text-gray-500 font-semibold">
                        {moment().format('MMM DD')}
                      </h5>
                      <p className="mt-1 text-3xl font-bold">
                        19 <span className="text-xl">&deg;C</span>
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Min: 17.3 &deg;C Max: 21 &deg;C
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  <p>Cloud cover: 90%</p>
                  <p>Wind speed: 2.3 m/s</p>
                  <p>Radiation: 37 W/m&sup2;</p>
                </div>
              </div>

              <TemperatureChart />
            </>
          )}

          {activeTab == 'tomorrow' && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex gap-2 items-center">
                    <SunIcon className="inline-block w-8 h-8" />

                    <div>
                      <h5 className="text-sm text-gray-500 font-semibold">
                        {moment().add(1, 'day').format('MMM DD')}
                      </h5>
                      <p className="mt-1 text-3xl font-bold">
                        19 <span className="text-xl">&deg;C</span>
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Min: 17.3 &deg;C Max: 21 &deg;C
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  <p>Cloud cover: 90%</p>
                  <p>Wind speed: 2.3 m/s</p>
                  <p>Radiation: 37 W/m&sup2;</p>
                </div>
              </div>

              <TemperatureChart />
            </>
          )}

          {activeTab == 'this week' && <div>This week</div>}
        </div>
      </div>
    </>
  )
}
