import { useQueries } from '@tanstack/react-query'

import { measurements } from '../measurements'

import { BatteryStatus } from '../../types'

export const useBatteryStatus = () => {
  // FIXME: use /api/measurements/:id/last_measurement instead

  const queries = [
    {
      device: 'E_HUB',
      sensor: 'soc',
      start: '2023-12-01T20:00:00+00:00',
      end: '2023-12-01T22:00:00+00:00'
    },
    {
      device: 'E_HUB',
      sensor: 'soh',
      start: '2023-11-24T10:00:00+00:00',
      end: '2023-11-24T11:00:00+00:00'
    },
    {
      device: 'E_HUB',
      sensor: 'ratedcap',
      start: '2023-11-24T10:00:00+00:00',
      end: '2023-11-24T11:00:00+00:00'
    },
    {
      device: 'E_HUB',
      sensor: 'wbatprod',
      start: '2023-12-06T20:00:00+00:00',
      end: '2023-12-06T22:00:00+00:00'
    },
    {
      device: 'E_HUB',
      sensor: 'wbatcons',
      start: '2023-12-06T20:00:00+00:00',
      end: '2023-12-06T22:00:00+00:00'
    }
  ]

  const { isSuccess, data } = useQueries({
    queries: queries.map(({ device, sensor, start, end }) => {
      return {
        queryKey: ['measurements', sensor, start, end],
        queryFn: () => measurements(device, sensor, start, end)
      }
    }),
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
      battery: {
        charge: 0,
        health: 0,
        capacity: 0,
        charged: 0,
        discharged: 0
      }
    }
  }

  const status: BatteryStatus = {
    charge: data.soc.value[0],
    health: data.soh.value[0],
    capacity: data.ratedcap.value[0],
    charged: data.wbatcons.value[0],
    discharged: data.wbatprod.value[0]
  }

  return {
    isSuccess,
    status
  }
}
