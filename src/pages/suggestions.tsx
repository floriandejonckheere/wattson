import { ReactElement } from 'react'

import EnergyAlerts from '../components/cards/energy_alerts'
import Weather from '../components/cards/weather'

export default function Suggestions(): ReactElement {
  return (
    <>
      <h2 className="text-xl font-bold dark:text-slate-300">Suggestions</h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 mt-6 gap-16">
        <EnergyAlerts />
        <Weather />
      </div>
    </>
  )
}
