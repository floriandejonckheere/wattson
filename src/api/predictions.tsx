import axios, { AxiosError } from 'axios'

export function predictions(
  program: string,
  starttime: string,
  enddtime: string
) {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new AxiosError('Unauthorized')
  }

  return axios
    .get(`/api/predictions/get/`, {
      params: {
        program,
        starttime,
        enddtime,
        download: 'no'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then((response) => {
      return response.data
    })
}
