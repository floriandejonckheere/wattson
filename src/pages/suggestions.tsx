import { ReactElement } from 'react'

import Weather from '../components/cards/weather'

export default function Suggestions(): ReactElement {
  return (
    <>
      <h2 className="text-xl font-bold dark:text-slate-300">Suggestions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-16">
        <Weather />
      </div>
    </>
  )
}
