import { useQueries } from '@tanstack/react-query'
import moment from 'moment'

import { measurements } from '../measurements'

import { Measurement, Sensor } from '../../types'

export const useMeasurements = (
  startTime: Date,
  endTime: Date,
  sensors: Sensor[]
): { data: { string: Measurement }; isSuccess: boolean } => {
  const start = moment(startTime).format()
  const end = moment(endTime).format()

  const { isSuccess, data } = useQueries({
    queries: sensors.map((sensor) => ({
      queryKey: ['measurements', sensor.name, start, end],
      queryFn: () => measurements(sensor.device, sensor.sensor, start, end)
    })),
    combine: (results) => {
      return {
        data: Object.assign({}, ...results.map((result) => result.data)),
        isSuccess: results.every((result) => result.isSuccess)
      }
    }
  })

  return {
    isSuccess,
    data
  }
}
