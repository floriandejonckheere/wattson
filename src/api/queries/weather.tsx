import { useQueries } from '@tanstack/react-query'
import moment from 'moment'

import { predictions } from '../predictions'

import { Location, Forecast } from '../../types'

export const useWeather = (date: Date, location: Location) => {
  const startTime = moment(date).startOf('day').format()
  const endTime = moment(date).endOf('day').format()

  const temperature = `Temperature_${location.latitude},${location.longitude}`
  const cloudCover = `Cloud_Cover_${location.latitude},${location.longitude}`
  const windSpeed = `Wind_Speed_${location.latitude},${location.longitude}`

  const { isSuccess, data } = useQueries({
    queries: [
      {
        queryKey: ['predictions', temperature, startTime, endTime],
        queryFn: () => predictions(temperature, startTime, endTime)
      },
      {
        queryKey: ['predictions', cloudCover, startTime, endTime],
        queryFn: () => predictions(cloudCover, startTime, endTime)
      },
      {
        queryKey: ['predictions', windSpeed, startTime, endTime],
        queryFn: () => predictions(windSpeed, startTime, endTime)
      }
    ],
    combine: (results) => {
      return {
        data: Object.assign({}, ...results.map((result) => result.data)),
        isSuccess: results.every((result) => result.isSuccess)
      }
    }
  })

  if (!isSuccess) {
    return {
      isSuccess,
      forecast: {
        date,
        forecast: 'sunny',
        temperature: {
          minimum: 0,
          maximum: 0,
          average: 0
        },
        cloudCover: 0,
        windSpeed: 0
      }
    }
  }

  const forecast: Forecast = {
    date,
    forecast: 'sunny',
    temperature: {
      minimum: Math.min(...data[temperature].value),
      maximum: Math.max(...data[temperature].value),
      average: Math.avg(data[temperature].value)
    },
    cloudCover: Math.avg(data[cloudCover].value),
    windSpeed: Math.avg(data[windSpeed].value)
  }

  return {
    isSuccess,
    forecast
  }
}
