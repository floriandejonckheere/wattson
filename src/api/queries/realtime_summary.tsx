import { useQueries } from '@tanstack/react-query'
import moment from 'moment'

import { predictions } from '../predictions'
import { measurements } from '../measurements'

import { RealtimeSummary } from '../../types'

export const useRealtimeSummary = () => {
  const startTimeToday = moment().startOf('day').format()
  const endTimeToday = moment().endOf('day').format()

  const startTimeNow = moment().startOf('hour').format()
  const endTimeNow = moment().endOf('hour').format()

  const { isSuccess, data } = useQueries({
    queries: [
      {
        queryKey: ['measurements', 'summary', startTimeNow, endTimeNow],
        queryFn: () =>
          measurements(
            'E_HUB',
            ['pload_L1', 'pload_L2', 'pload_L3', 'ul_L1', 'ul_L2', 'ul_L3'],
            startTimeNow,
            endTimeNow
          )
      },
      {
        queryKey: ['predictions', 'Spot_price', startTimeToday, endTimeToday],
        queryFn: () => predictions('Spot_price', startTimeToday, endTimeToday)
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
    totalPower:
      data.pload_L1.value[data.pload_L1.value.length - 1] +
      data.pload_L2.value[data.pload_L2.value.length - 1] +
      data.pload_L3.value[data.pload_L3.value.length - 1],
    voltage: Math.avg([
      data.ul_L1.value[data.ul_L1.value.length - 1],
      data.ul_L2.value[data.ul_L2.value.length - 1],
      data.ul_L3.value[data.ul_L3.value.length - 1]
    ]),
    current: 0,
    energyPrice: Math.avg(data.Spot_price.value),
    energyCost: 0
  }

  return {
    isSuccess,
    summary
  }
}
