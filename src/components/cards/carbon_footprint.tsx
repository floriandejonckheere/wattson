import { ReactElement, useState } from 'react'

export default function CarbonFootprint(): ReactElement {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex flex-col gap-8 bg-white rounded-lg shadow p-7 dark:bg-slate-700 transition-all duration-500">
      <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Carbon Footprint
        </h2>
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button className="bg-sky-700 text-gray-800 px-4 py-2 rounded">
            More info
          </button>
          {isHovered && (
            <div className="absolute bg-sky-700 text-gray-800 p-4 rounded shadow-md mt-2 dark:bg-white transition-all duration-500">
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
