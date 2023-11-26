import { ReactElement, useState } from 'react'
import moment from 'moment'

import { CloudIcon, SunIcon } from '@heroicons/react/24/outline'

import TemperatureChart from '../components/charts/temperature'

export default function Suggestions(): ReactElement {
  const [activeTab, setActiveTab] = useState('today')

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
            <h3 className="text-xl font-bold text-gray-600 dark:text-gray-200 mb-2">
              Weather
            </h3>
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
