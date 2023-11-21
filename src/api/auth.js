export async function signin(username, password) {
  return fetch(`/api/users/token`, {
    method: 'POST',
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
  }).then(
    (data) => data.json(),
    (error) => console.error(error)
  )
}
