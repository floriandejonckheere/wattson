import { ReactElement } from 'react'

import RealtimeSummary from '../components/cards/realtime_summary'
import CarbonFootprint from '../components/cards/carbon_footprint'
import BatteryStatus from '../components/cards/battery_status'

export default function Overview(): ReactElement {
  return (
    <>
      <h2 className="text-xl font-bold dark:text-slate-300">Overview</h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 mt-8 gap-8">
        <RealtimeSummary />
        <CarbonFootprint />
        <BatteryStatus />
      </div>
    </>
  )
}
