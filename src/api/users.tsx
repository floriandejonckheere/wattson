export async function me() {
  const token = localStorage.getItem('token')

  if(!token) {
    throw new Error('Token not found')
  }

  const response = await fetch(`/api/users/me/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Authorization: `Bearer ${JSON.parse(token)}`
    }
  })

  const body = await response.json()

  if (!response.ok) {
    throw new Error(body.detail)
  }

  return body
}
