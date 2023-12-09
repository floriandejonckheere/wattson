import { ReactElement, useState } from 'react'
import Spinner from '../components/spinner'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useLocalStorage } from '@uidotdev/usehooks'
import axios from 'axios'

import { changePassword, deleteAccount, me } from '../api/users'
import { Cog6ToothIcon } from '@heroicons/react/24/solid'

export default function Settings(): ReactElement {
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [, setToken] = useLocalStorage('token', null)
  const { isPending, isError, data } = useQuery({
    queryKey: ['me'],
    queryFn: me
  })

  const updatePasswordMutation = useMutation({
    mutationFn: (event: Event) => {
      event.preventDefault()
      return changePassword(newPassword, confirmNewPassword)
    },
    onSuccess: () => {
      window.location.href = '/overview'
    }
  })

  const deleteAccountMutation = useMutation({
    mutationFn: (event: Event) => {
      event.preventDefault()
      return deleteAccount(data.username)
    },
    onSuccess: () => {
      setToken(null)
    }
  })

  return (
    <>
      <h2 className="text-xl font-bold dark:text-slate-300 mb-8">Settings</h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Role and permissions
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Update your account role and permissions
            </p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="block text-sm mb-2 dark:text-white">
              Administrator
            </span>
            <div className="hs-tooltip hs-tooltip-toggle">
              <input
                type="checkbox"
                id="hs-basic-usage"
                className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-sky-700 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-sky-700 checked:border-sky-700 focus:checked:border-sky-700 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-sky-900 dark:checked:border-sky-900 dark:focus:ring-offset-gray-600 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-sky-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-sky-200"
                disabled={!data?.is_admin}
                checked={data?.is_admin}
              />

              {data?.is_admin || (
                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-white text-sm"
                  role="tooltip"
                >
                  Role can only be changed if you're an administrator
                </span>
              )}
            </div>

            <label htmlFor="hs-basic-usage" className="sr-only">
              switch
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Delete
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Delete your account
            </p>
            <p className="font-bold text-sm text-red-600 dark:text-red-400">
              WARNING: This action will irreversibly delete your account and all
              associated data!
            </p>
          </div>

          {/* @ts-expect-error - mutation is not a real form handler */}
          <form onSubmit={deleteAccountMutation.mutate}>
            <div className="grid gap-y-4">
              {deleteAccountMutation.isError && (
                <p className="text-sm text-red-600 font-bold">
                  Error:{' '}
                  {axios.isAxiosError(deleteAccountMutation.error)
                    ? deleteAccountMutation.error.response?.data.detail
                    : deleteAccountMutation.error.message}
                </p>
              )}

              <button
                type="submit"
                className="w-full mt-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-700 text-white hover:bg-red-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-red-800 dark:text-white hover:dark:bg-red-900  "
                disabled={
                  deleteAccountMutation.isPending || isPending || isError
                }
              >
                {deleteAccountMutation.isPending || isPending || isError ? (
                  <Spinner color="text-white" />
                ) : (
                  'Delete account'
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Password
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Update your account password
            </p>
          </div>

          {/* @ts-expect-error - mutation is not a real form handler */}
          <form onSubmit={updatePasswordMutation.mutate}>
            <div className="grid gap-y-4">
              {updatePasswordMutation.isError && (
                <p className="text-sm text-red-600 font-bold">
                  Error:{' '}
                  {axios.isAxiosError(updatePasswordMutation.error)
                    ? updatePasswordMutation.error.response?.data.detail
                    : updatePasswordMutation.error.message}
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
                  onChange={(event) =>
                    setConfirmNewPassword(event.target.value)
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-sky-700 text-white hover:bg-sky-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                disabled={updatePasswordMutation.isPending}
              >
                {updatePasswordMutation.isPending ? (
                  <Spinner color="text-white" />
                ) : (
                  'Update'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
