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

  const { isSuccess, isError, error, data } = useQueries({
    queries: sensors.map((sensor) => ({
      queryKey: ['measurements', sensor.name, start, end],
      queryFn: () => measurements(sensor.device, sensor.sensor, start, end)
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
