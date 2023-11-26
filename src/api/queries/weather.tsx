import { useQueries } from '@tanstack/react-query'
import moment from 'moment'

import { predictions } from '../predictions'

import { Location, Forecast } from '../../types'

export const useWeather = (date: Date, location: Location) => {
  const startTime = moment(date).startOf('day').format()
  const endTime = moment(date).endOf('day').format()

  const temperature = `Temperature_${location.latitude},${location.longitude}`
  const cloudCover = `Cloud_Cover_${location.latitude},${location.longitude}`

  const { isSuccess, data } = useQueries({
    queries: [
      {
        queryKey: ['predictions', temperature, startTime, endTime],
        queryFn: () => predictions(temperature, startTime, endTime)
      },
      {
        queryKey: ['predictions', cloudCover, startTime, endTime],
        queryFn: () => predictions(cloudCover, startTime, endTime)
      }
    ],
    combine: (results) => {
      return {
        data: Object.assign({}, ...results.map((result) => result.data)),
        isSuccess: results.every((result) => result.isSuccess)
      }
    }
  })

  const forecast: Forecast = {
    date,
    forecast: 'sunny',
    temperature: {
      minimum: isSuccess ? Math.min(...data[temperature].value) : 0,
      maximum: isSuccess ? Math.max(...data[temperature].value) : 0,
      average: isSuccess
        ? data[temperature].value.reduce((a: number, b: number) => a + b, 0) /
          data[temperature].value.length
        : 0
    },
    cloudCover: isSuccess
      ? data[cloudCover].value.reduce((a: number, b: number) => a + b) /
        data[cloudCover].value.length
      : 0,
    windSpeed: 0,
    radiation: 0
  }

  return {
    isSuccess,
    forecast
  }
}
