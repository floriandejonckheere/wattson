import { ReactElement, useState } from 'react'

import { SUGGESTIONS } from '../../api/data'

export default function EnergySuggestions(): ReactElement {
  const [currentIndex, setCurrentIndex] = useState(0)

  const suggestion = SUGGESTIONS[currentIndex]

  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg shadow p-7 dark:bg-slate-700">
      <h3 className="flex gap-3 items-center text-xl font-bold text-gray-600 dark:text-gray-200 mb-6">
        Energy suggestions
      </h3>

      <div className="mb-4">
        {suggestion ? (
          <>
            <h4 className="mb-2 text-md font-semibold text-gray-800 dark:text-gray-200">
              {suggestion.title}
            </h4>
            <span className="text-sm text-justify dark:text-white">
              {suggestion.text}
            </span>
          </>
        ) : (
          <span className="text-sm text-gray-500 dark:text-gray-200">
            No suggestions available
          </span>
        )}
      </div>

      <div className="flex flex-row justify-end gap-2">
        <a
          href="#"
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 disabled:pointer-events-none"
          onClick={(e) => {
            e.preventDefault()
            setCurrentIndex((currentIndex + 1) % SUGGESTIONS.length)
          }}
        >
          Remind me later
        </a>
        <a
          href="#"
          className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-sky-700 text-white hover:bg-sky-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          onClick={(e) => {
            e.preventDefault()
            setCurrentIndex((currentIndex + 1) % SUGGESTIONS.length)
          }}
        >
          Next suggestion
        </a>
      </div>
    </div>
  )
}
