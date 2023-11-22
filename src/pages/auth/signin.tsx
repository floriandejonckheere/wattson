import { ReactElement, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { BoltIcon } from '@heroicons/react/24/solid'

import { signin } from '../../api/auth'

export default function Signin(): ReactElement {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const mutation = useMutation({
    mutationFn: (event: Event) => {
      event.preventDefault()
      return signin(username, password)
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.access_token)
      window.location.href = '/overview'
    },
    onError: () => {
      localStorage.removeItem('token')
    }
  })

  return (
    <main className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <div className="inline-flex items-center gap-x-4 text-2xl font-bold dark:text-white">
              <BoltIcon className="h-10 w-10 p-2.5 bg-sky-700 text-white rounded-full" />
              Wattson
            </div>
          </div>

          <div className="mt-5">
            <form>
              <div className="grid gap-y-4">
                <p
                  className={`${
                    mutation.isError ? 'pending' : ''
                  } text-sm text-red-600 font-bold`}
                >
                  {mutation.isError && mutation.error.message}
                </p>

                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-sky-700 focus:ring-sky-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    required
                    aria-describedby="email-error"
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-sky-700 focus:ring-sky-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    required
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-sky-700 text-white hover:bg-sky-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  onClick={mutation.mutate}
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
