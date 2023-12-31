import { ReactElement, useState } from 'react'
import moment from 'moment'

import {
  CloudIcon,
  SunIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'

import Spinner from '../spinner'

import TemperatureChart from '../charts/temperature'

import { useWeather } from '../../api/queries/weather'
import { LOCATIONS } from '../../api/data'

import { Forecast } from '../../types'

function WeatherDetail(props: {
  success: boolean
  forecast: Forecast
}): ReactElement {
  const { success, forecast } = props

  if (!success) {
    return (
      <div className="flex justify-center items-center h-48">
        <Spinner size="8" />
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex gap-2 items-center">
            {forecast.cloudCover > 50 ? (
              <CloudIcon className="inline-block w-6 h-6 dark:text-white" />
            ) : (
              <SunIcon className="inline-block w-6 h-6 dark:text-white" />
            )}

            <div>
              <h5 className="text-sm text-gray-500 font-semibold dark:text-gray-300">
                {moment(forecast.date).format('MMM DD')}
              </h5>
              <p className="mt-1 text-3xl font-bold dark:text-white">
                {forecast.temperature.average.toFixed(1)}{' '}
                <span className="text-xl">&deg;C</span>
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-300">
                Min: {forecast.temperature.minimum.toFixed(1)} &deg;C Max:{' '}
                {forecast.temperature.maximum.toFixed(1)} &deg;C
              </p>
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-700">
          <p>Cloud cover: {Math.round(forecast.cloudCover)}%</p>
          <p>Wind speed: {forecast.windSpeed.toFixed(1)} m/s</p>
        </div>
      </div>

      <TemperatureChart
        categories={new Array(24)
          .fill('')
          .map((_, i) => `${i}:00`.padStart(5, '0'))}
        series={[
          {
            name: 'Temperature',
            type: 'line',
            data: forecast.temperature.values
          },
          {
            name: 'Rain',
            type: 'column',
            data: forecast.rain.values
          },
          {
            name: 'Snowfall',
            type: 'column',
            data: forecast.snowfall.values
          }
        ]}
      />
    </>
  )
}

export default function Weather(): ReactElement {
  const [activeTab, setActiveTab] = useState('today')
  const [activeLocation, setActiveLocation] = useState(LOCATIONS[0])

  const { isSuccess: todayIsSuccess, forecast: today } = useWeather(
    moment().utc().toDate(),
    activeLocation,
    activeTab == 'today'
  )
  const { isSuccess: tomorrowIsSuccess, forecast: tomorrow } = useWeather(
    moment().utc().add(1, 'day').toDate(),
    activeLocation,
    activeTab === 'tomorrow'
  )

  return (
    <div className="flex flex-col gap-6 bg-white rounded-lg shadow p-7 dark:bg-slate-700">
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
                <ChevronDownIcon className="w-4 h-4" />
              </button>

              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full z-50"
                aria-labelledby="hs-dropdown-default"
              >
                {LOCATIONS.slice(0, 2).map((location) => (
                  <a
                    key={location.name}
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
            className={`py-1.5 px-3 rounded-full text-xs font-medium dark:text-white ${
              activeTab == 'today' &&
              'bg-blue-100 text-blue-600 dark:bg-slate-800 dark:text-white'
            }`}
            onClick={() => setActiveTab('today')}
          >
            Today
          </button>
          <button
            className={`py-1.5 px-3 rounded-full text-xs font-medium dark:text-white ${
              activeTab == 'tomorrow' &&
              'bg-blue-100 text-blue-600 dark:bg-slate-800 dark:text-white'
            }`}
            onClick={() => setActiveTab('tomorrow')}
          >
            Tomorrow
          </button>
        </div>
      </div>

      {activeTab == 'today' && (
        <WeatherDetail success={todayIsSuccess} forecast={today} />
      )}

      {activeTab == 'tomorrow' && (
        <WeatherDetail success={tomorrowIsSuccess} forecast={tomorrow} />
      )}
    </div>
  )
}
