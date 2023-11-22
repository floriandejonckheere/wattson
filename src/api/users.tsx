export async function me() {
  const response = await fetch(`/api/users/me/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

  const body = await response.json()

  if (!response.ok) {
    throw new Error(body.detail)
  }

  return body
}
