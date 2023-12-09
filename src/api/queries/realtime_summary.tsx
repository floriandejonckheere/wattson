import { useQueries } from '@tanstack/react-query'
import moment from 'moment'

import { predictions } from '../predictions'

import { RealtimeSummary } from '../../types'

export const useRealtimeSummary = () => {
  const startTime = moment().startOf('day').format()
  const endTime = moment().endOf('day').format()

  const { isSuccess, data } = useQueries({
    queries: [
      {
        queryKey: ['predictions', 'Spot_price', startTime, endTime],
        queryFn: () => predictions('Spot_price', startTime, endTime)
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
      summary: {
        totalPower: 0,
        voltage: 0,
        current: 0,
        energyPrice: 0,
        energyCost: 0
      }
    }
  }

  const summary: RealtimeSummary = {
    totalPower: 0,
    voltage: 0,
    current: 0,
    energyPrice: Math.avg(data.Spot_price.value),
    energyCost: 0
  }

  return {
    isSuccess,
    summary
  }
}
