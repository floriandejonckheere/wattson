import { useQueries } from '@tanstack/react-query'
import moment from 'moment'

import { measurements } from '../measurements'

import { Sensor } from '../../types'

export const useMeasurements = (
  startTime: Date,
  endTime: Date,
  sensors: Sensor[]
) => {
  const start = moment(startTime).format()
  const end = moment(endTime).format()

  const queries = sensors.reduce(
    (acc: { [key: string]: Sensor[] }, sensor: Sensor) => {
      acc[sensor.device] = acc[sensor.device] ?? []
      acc[sensor.device].push(sensor)

      return acc
    },
    {}
  )

  const { isSuccess, isError, data } = useQueries({
    queries: Object.entries(queries).map(([device, sensors]) => ({
      queryKey: [
        'measurements',
        sensors.reduce(
          (acc: string, sensor: Sensor) => `${acc},${sensor.name}`,
          ''
        ),
        start,
        end
      ],
      queryFn: () =>
        measurements(
          device,
          sensors.map((sensor) => sensor.sensor),
          start,
          end
        )
    })),
    combine: (results) => {
      return {
        data: Object.assign({}, ...results.map((result) => result.data)),
        isSuccess: results.every((result) => result.isSuccess),
        isError: results.some((result) => result.isError)
      }
    }
  })

  // API returns a HTTP 400 when there is no data
  if (isError) {
    return {
      isSuccess: true,
      data: {}
    }
  }

  return {
    isSuccess,
    data
  }
}
