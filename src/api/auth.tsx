import axios from 'axios'

export function signin(username: string, password: string) {
  return axios
    .post(`/api/users/token`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
      },
      body: new URLSearchParams({
        username,
        password,
        grant_type: '',
        scope: '',
        client_id: '',
        client_secret: ''
      })
    })
    .then((response) => {
      return response.data
    })
}

export function signup(email: string, username: string, password: string) {
  return axios
    .post(`/api/users/register`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
      },
      body: new URLSearchParams({
        email,
        username,
        password
      })
    })
    .then((response) => {
      return response.data
    })
}
