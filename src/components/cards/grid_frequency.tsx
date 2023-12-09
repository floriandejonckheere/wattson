import { ReactElement, useState } from 'react'
import moment from 'moment'

import { Measurement, Sensor } from '../../types'

import Spinner from '../spinner'

import MeasurementsChart from '../charts/measurements'

import { useMeasurements } from '../../api/queries/measurements'

function GridFrequencyDetail(props: {
  sensor: Sensor
  success: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}): ReactElement {
  const { sensor, success, data } = props

  if (!success) {
    return (
      <div className="flex justify-center items-center h-48">
        <Spinner size="8" />
      </div>
    )
  }

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
      options={{
        markers: {
          size: 0
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        yaxis: {
          labels: {
            formatter: (value) => `${value.toFixed(2)} Hz`
          }
        }
      }}
    />
  )
}

export default function GridFrequency(): ReactElement {
  const [startTime, setStartTime] = useState<Date>(new Date(2023, 11, 6, 8))
  const [endTime, setEndTime] = useState<Date>(new Date(2023, 11, 6, 8, 10))

  const sensor: Sensor = {
    name: 'Grid frequency',
    device: 'E_HUB',
    sensor: 'gridfreq'
  }

  const { isSuccess, data } = useMeasurements(startTime, endTime, [sensor])

  return (
    <div className="flex flex-col gap-6 bg-white rounded-lg shadow p-7 dark:bg-slate-700">
      <div>
        <h3 className="text-xl font-bold text-gray-600 dark:text-gray-200 mb-2">
          Grid frequency
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Track the historical frequency of the electricity grid
        </p>
      </div>

      <div className="flex items-center place-content-between">
        <h5 className="text-sm text-gray-500">Start time</h5>
        <input
          type="datetime-local"
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm focus:ring-0 focus:outline-none hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none"
          id="energy-consumption-start-date-time"
          name="energy-consumption-start-date-time"
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
          id="energy-consumption-end-date-time"
          name="energy-consumption-end-date-time"
          value={moment(endTime)
            .utcOffset(0, true)
            .format('YYYY-MM-DDTHH:mm:ss')}
          onChange={(event) => setEndTime(new Date(event.target.value))}
        />
      </div>

      <GridFrequencyDetail sensor={sensor} success={isSuccess} data={data} />
    </div>
  )
}
