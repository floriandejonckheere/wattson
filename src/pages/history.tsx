import { ReactElement } from 'react'

import EnergyConsumption from '../components/cards/energy_consumption'
import GridFrequency from '../components/cards/grid_frequency'

export default function History(): ReactElement {
  return (
    <>
      <h2 className="text-xl font-bold dark:text-slate-300">History</h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 mt-6 gap-8">
        <EnergyConsumption />
        <GridFrequency />
      </div>
    </>
  )
}
