import { ReactElement, useState } from 'react'
import moment from 'moment'

import { ChevronDownIcon } from '@heroicons/react/24/outline'

import { Measurement, Sensor } from '../../types'
import { LOCATIONS } from '../../api/data'

import Spinner from '../spinner'

import MeasurementsChart from '../charts/measurements'

import { useMeasurements } from '../../api/queries/measurements'

export const SENSORS: Sensor[] = [
  {
    name: 'Fronius',
    location: LOCATIONS[0],
    device: 'Fronius_Ruissalo',
    sensor: 'P'
  },
  {
    name: 'Fronius Hybrid 4',
    location: LOCATIONS[1],
    device: 'Fronius_Hybrid_4',
    sensor: 'P'
  },
  {
    name: 'Fronius Symo 4.5-3-M',
    location: LOCATIONS[1],
    device: 'Fronius_Symo_4.5-3-M',
    sensor: 'P'
  }
]

function EnergyProductionDetail(props: {
  sensor: Sensor
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}): ReactElement {
  const { sensor, data } = props

  const measurement: Measurement = data[sensor.sensor]

  if (!measurement) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-sm text-gray-400">No data available</p>
      </div>
    )
  }

  return (
    <MeasurementsChart
      categories={measurement.starttime}
      series={[{ name: sensor.name, data: measurement.value }]}
      unit={measurement.unit}
    />
  )
}

export default function EnergyProduction(): ReactElement {
  const [activeLocation, setActiveLocation] = useState(LOCATIONS[0])
  const [activeSensor, setActiveSensor] = useState<Sensor>(SENSORS[0])

  const [startTime, setStartTime] = useState<Date>(new Date(2023, 10, 3, 7))
  const [endTime, setEndTime] = useState<Date>(new Date(2023, 10, 3, 8))

  const { isSuccess, data } = useMeasurements(startTime, endTime, [
    activeSensor
  ])

  return (
    <div className="flex flex-col gap-6 bg-white rounded-lg shadow p-7 dark:bg-slate-700">
      <div>
        <div className="float-right flex gap-4">
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
              {[...new Set(SENSORS.map((s) => s.location))].map((location) => (
                <a
                  key={location.name}
                  className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveLocation(location)
                    setActiveSensor(
                      SENSORS.filter((s) => s.location == location)[0]
                    )
                  }}
                >
                  {location.name}
                </a>
              ))}
            </div>
          </div>

          <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
            <button
              id="hs-dropdown-default"
              type="button"
              className="hs-dropdown-toggle py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              {activeSensor.name}
              <ChevronDownIcon className="w-4 h-4" />
            </button>

            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full z-50"
              aria-labelledby="hs-dropdown-default"
            >
              {SENSORS.filter((s) => s.location == activeLocation).map(
                (sensor) => (
                  <a
                    key={sensor.name}
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveSensor(sensor)
                    }}
                  >
                    {sensor.name}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-600 dark:text-gray-200 mb-2">
          Energy production
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Track the historical production of energy
        </p>
      </div>

      <div className="flex items-center place-content-between">
        <h5 className="text-sm text-gray-500">Start time</h5>
        <input
          type="datetime-local"
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm focus:ring-0 focus:outline-none hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none"
          id="energy-Production-start-date-time"
          name="energy-Production-start-date-time"
          value={moment(startTime)
            .utcOffset(0, true)
            .format('YYYY-MM-DDTHH:mm:ss')}
          onChange={(event) => setStartTime(new Date(event.target.value))}
        />
      </div>

      <div className="flex items-center place-content-between">
        <h5 className="text-sm text-gray-500">End time</h5>
        <input
          type="datetime-local"
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm focus:ring-0 focus:outline-none hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none"
          id="energy-Production-end-date-time"
          name="energy-Production-end-date-time"
          value={moment(endTime)
            .utcOffset(0, true)
            .format('YYYY-MM-DDTHH:mm:ss')}
          onChange={(event) => setEndTime(new Date(event.target.value))}
        />
      </div>

      {!isSuccess ? (
        <div className="flex justify-center items-center h-48">
          <Spinner size="8" />
        </div>
      ) : (
        <EnergyProductionDetail sensor={activeSensor} data={data} />
      )}
    </div>
  )
}
