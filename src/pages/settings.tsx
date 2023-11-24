import { ReactElement, useState } from 'react'
import Spinner from '../components/spinner'
import { useMutation } from '@tanstack/react-query'

import { changePassword } from '../api/users'

export default function Settings(): ReactElement {
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const mutation = useMutation({
    mutationFn: (event: Event) => {
      event.preventDefault()
      return changePassword(newPassword, confirmNewPassword)
    },
    onSuccess: () => {
      window.location.href = '/overview'
    }
  })

  return (
    <>
      <h2 className="text-xl font-bold">Settings</h2>

      {/* @ts-expect-error - mutation is not a real form handler */}
      <form onSubmit={mutation.mutate}>
        <div className="grid gap-y-4">
          {mutation.isError && (
            <p className="text-sm text-red-600 font-bold">
              An error occurred: {mutation.error.message}
            </p>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm mb-2 dark:text-white"
            >
              New password
            </label>
            <input
              type="password"
              id="new_password"
              name="new_password"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-sky-700 focus:ring-sky-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              required
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm mb-2 dark:text-white"
            >
              Confirm new password
            </label>
            <input
              type="password"
              id="confirm_new_password"
              name="confirm_new_password"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-sky-700 focus:ring-sky-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              required
              onChange={(event) => setConfirmNewPassword(event.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-sky-700 text-white hover:bg-sky-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <Spinner /> : 'Update'}
          </button>
        </div>
      </form>
    </>
  )
}
