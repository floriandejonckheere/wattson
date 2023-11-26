import { useQuery } from '@tanstack/react-query'
import moment from 'moment'

import { predictions } from '../predictions'

import { Location, Forecast } from '../../types'

export const useWeather = (date: Date, location: Location) => {
  const program = `Temperature_${location.latitude},${location.longitude}`

  const { isSuccess, data } = useQuery({
    queryKey: ['predictions'],
    queryFn: () =>
      predictions(
        program,
        moment(date).startOf('day').format(),
        moment(date).endOf('day').format()
      )
  })

  const forecast: Forecast = {
    date,
    forecast: 'sunny',
    temperature: {
      minimum: isSuccess ? Math.min(...data[program].value) : 0,
      maximum: isSuccess ? Math.max(...data[program].value) : 0,
      average: isSuccess ? data[program].value.reduce((a: number, b: number) => a + b, 0) / data[program].value.length : 0
    },
    cloudCover: 0,
    windSpeed: 0,
    radiation: 0
  }

  return {
    isSuccess,
    forecast
  }
}
