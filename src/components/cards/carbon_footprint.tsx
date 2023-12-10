import { ReactElement, useState } from 'react'

export default function CarbonFootprint(): ReactElement {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex flex-col gap-8 bg-white rounded-lg shadow p-7 dark:bg-slate-700 transition-all duration-500">
      <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Carbon Footprint
        </h2>
        <div className="relative">
          <button
            className="my-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-sky-700 text-white hover:bg-sky-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            More info
          </button>
          {isHovered && (
            <div className="absolute p-4 rounded-lg shadow-md transition-all duration-500 text-sm bg-gray-900 text-white">
              <p>
                A carbon footprint is a measurement of the various greenhouse
                gases, such as carbon dioxide (CO2), methane (CH4), nitrous
                oxide (N2O), and others, caused by energy consumption. These
                gasses are combined into a common unit called carbon dioxide
                equivalent (CO2e), based on their global warming potential. The
                value for the carbon footprint is measured by: kW * 1h * 0.5kg
                CO2/kWh
              </p>
            </div>
          )}
        </div>
        <h4 className="text-lg text-gray-500 dark:text-slate-400 font-semibold">
          Total Carbon Footprint
        </h4>
        <p className="mt-2 text-center text-5xl text-green-800 font-bold">
          1kg CO2e
        </p>
      </div>
    </div>
  )
}
