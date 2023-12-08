import { ReactElement } from 'react'

import EnergyConsumption from '../components/cards/energy_consumption'

export default function History(): ReactElement {
  return (
    <>
      <h2 className="text-xl font-bold dark:text-slate-300">History</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-16">
        <EnergyConsumption />
      </div>
    </>
  )
}