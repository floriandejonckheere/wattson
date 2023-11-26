import { ReactElement, useState } from 'react'

export default function Suggestions(): ReactElement {
  const [activeTab, setActiveTab] = useState('today')

  return (
    <>
      <h2 className="text-xl font-bold">Suggestions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-16">
        <div className="flex flex-col gap-8 bg-white rounded-lg shadow p-7 dark:bg-slate-900">
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Weather
            </h3>
            <div className="flex gap-3">
              <button
                className={`py-1.5 px-3 rounded-full text-xs font-medium ${
                  activeTab == 'today' && 'bg-blue-100 text-blue-800'
                }`}
                onClick={() => setActiveTab('today')}
              >
                Today
              </button>
              <button
                className={`py-1.5 px-3 rounded-full text-xs font-medium ${
                  activeTab == 'tomorrow' && 'bg-blue-100 text-blue-800'
                }`}
                onClick={() => setActiveTab('tomorrow')}
              >
                Tomorrow
              </button>
              <button
                className={`py-1.5 px-3 rounded-full text-xs font-medium ${
                  activeTab == 'this week' && 'bg-blue-100 text-blue-800'
                }`}
                onClick={() => setActiveTab('this week')}
              >
                This week
              </button>
            </div>
          </div>

          {activeTab == 'today' && <div>Today</div>}

          {activeTab == 'tomorrow' && <div>Tomorrow</div>}

          {activeTab == 'this week' && <div>This week</div>}
        </div>
      </div>
    </>
  )
}
