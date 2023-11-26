import { ReactElement, useState } from 'react'
import moment from 'moment'

import { CloudIcon, SunIcon } from '@heroicons/react/24/outline'

import TemperatureChart from '../components/charts/temperature'

import { Locations } from '../api/data'

export default function Suggestions(): ReactElement {
  const [activeTab, setActiveTab] = useState('today')
  const [activeLocation, setActiveLocation] = useState(Locations.ruissalo)

  const weeklyForecast = [
    {
      day: moment().add(2, 'days'),
      temperature: 19,
      forecast: 'Cloudy',
      IconClass: CloudIcon
    },
    {
      day: moment().add(3, 'days'),
      temperature: 18,
      forecast: 'Sunny',
      IconClass: SunIcon
    },
    {
      day: moment().add(4, 'days'),
      temperature: 16,
      forecast: 'Rain',
      IconClass: CloudIcon
    },
    {
      day: moment().add(5, 'days'),
      temperature: 19,
      forecast: 'Cloudy',
      IconClass: CloudIcon
    },
    {
      day: moment().add(6, 'days'),
      temperature: 19,
      forecast: 'Cloudy',
      IconClass: CloudIcon
    }
  ]

  return (
    <>
      <h2 className="text-xl font-bold">Suggestions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-16">
        <div className="flex flex-col gap-6 bg-white rounded-lg shadow p-7 dark:bg-slate-900">
          <div>
            <div className="mb-6">
              <div className="float-right">
                <div className="hs-dropdown relative inline-flex">
                  <button
                    id="hs-dropdown-default"
                    type="button"
                    className="hs-dropdown-toggle py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    {activeLocation.name}
                    <svg
                      className="hs-dropdown-open:rotate-180 w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
                    aria-labelledby="hs-dropdown-default"
                  >
                    {Object.values(Locations).map((location) => (
                      <a
                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                        href="#"
                        onClick={() => setActiveLocation(location)}
                      >
                        {location.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-600 dark:text-gray-200 mb-2">
                Weather
              </h3>
            </div>
            <div className="flex gap-3">
              <button
                className={`py-1.5 px-3 rounded-full text-xs font-medium ${
                  activeTab == 'today' && 'bg-blue-100 text-blue-600'
                }`}
                onClick={() => setActiveTab('today')}
              >
                Today
              </button>
              <button
                className={`py-1.5 px-3 rounded-full text-xs font-medium ${
                  activeTab == 'tomorrow' && 'bg-blue-100 text-blue-600'
                }`}
                onClick={() => setActiveTab('tomorrow')}
              >
                Tomorrow
              </button>
              <button
                className={`py-1.5 px-3 rounded-full text-xs font-medium ${
                  activeTab == 'this week' && 'bg-blue-100 text-blue-600'
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
                    <SunIcon className="inline-block w-6 h-6" />

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

              <TemperatureChart
                categories={[
                  '00:00',
                  '03:00',
                  '06:00',
                  '09:00',
                  '12:00',
                  '15:00'
                ]}
                data={[19, 18, 18, 17, 19, 18]}
              />
            </>
          )}

          {activeTab == 'tomorrow' && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex gap-2 items-center">
                    <SunIcon className="inline-block w-6 h-6" />

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

              <TemperatureChart
                categories={[
                  '00:00',
                  '03:00',
                  '06:00',
                  '09:00',
                  '12:00',
                  '15:00'
                ]}
                data={[19, 18, 18, 17, 19, 18]}
              />
            </>
          )}

          {activeTab == 'this week' && (
            <>
              <div className="flex items-center justify-between">
                {weeklyForecast.map(
                  ({ day, temperature, forecast, IconClass }) => (
                    <div
                      key={day.format()}
                      className="flex flex-col gap-2 items-center"
                    >
                      <IconClass className="inline-block w-6 h-6" />

                      <div>
                        <h5 className="text-sm text-gray-500 font-semibold">
                          {day.format('ddd DD')}
                        </h5>
                        <p className="mt-1 text-3xl font-bold">
                          {temperature} <span className="text-xl">&deg;C</span>
                        </p>
                        <p className="mt-1 text-xs text-gray-500">{forecast}</p>
                      </div>
                    </div>
                  )
                )}
              </div>

              <TemperatureChart
                categories={weeklyForecast.map(({ day }) => day.format('DD'))}
                data={weeklyForecast.map(({ temperature }) => temperature)}
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}
