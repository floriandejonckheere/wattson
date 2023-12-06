import { ReactElement } from 'react'

export default function EnergySuggestions(): ReactElement {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg shadow p-7 dark:bg-slate-700">
      <div className="mb-6">
        <h3 className="flex gap-3 items-center text-xl font-bold text-gray-600 dark:text-gray-200 mb-2">
          Energy suggestions
        </h3>
      </div>
    </div>
  )
}
