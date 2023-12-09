import axios, { AxiosError } from 'axios'

export function measurements(
  device_name: string,
  sensor: string[],
  starttime: string,
  endtime: string
) {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new AxiosError('Unauthorized')
  }

  return axios
    .get(`/api/measurements/get/`, {
      params: {
        device_name,
        sensor,
        starttime,
        endtime,
        download: 'no'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`
      },
      paramsSerializer: {
        indexes: null
      }
    })
    .then((response) => {
      return response.data
    })
}
