import { useQueries } from '@tanstack/react-query'
import moment from 'moment'

import { predictions } from '../predictions'

import { Location, Forecast } from '../../types'

export const useWeather = (date: Date, location: Location) => {
  const start = moment(date).startOf('day')

  const startTime = start.format()
  const endTime = start.add(23, 'hours').format()

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
          average: 0,
          values: []
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
      minimum: Math.min(...data[temperature].value.slice(0, 24)), // FIXME: API returns 48 values
      maximum: Math.max(...data[temperature].value.slice(0, 24)), // FIXME: API returns 48 values
      average: Math.avg(data[temperature].value.slice(0, 24)), // FIXME: API returns 48 values
      values: data[temperature].value.slice(0, 24) // FIXME: API returns 48 values
    },
    cloudCover: Math.avg(data[cloudCover].value.slice(0, 24)), // FIXME: API returns 48 values
    windSpeed: Math.avg(data[windSpeed].value.slice(0, 24)) // FIXME: API returns 48 values
  }

  return {
    isSuccess,
    forecast
  }
}