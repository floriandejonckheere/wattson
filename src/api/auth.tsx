export async function signin(username: string, password: string) {
  const response = await fetch(`/api/users/token`, {
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
  })

  const body = await response.json()

  if (!response.ok) {
    throw new Error(body.detail)
  }

  return body
}
