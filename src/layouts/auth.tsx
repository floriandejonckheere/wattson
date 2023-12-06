import { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

export default function Auth(): ReactElement {
  return (
    <div className="flex flex-row w-full h-full bg-gray-50 dark:bg-slate-800 transition-all duration-500">
      <div className="w-full h-full max-w-md mx-auto p-6">
        <Outlet />
      </div>
    </div>
  )
}
