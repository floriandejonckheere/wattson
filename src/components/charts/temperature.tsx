import { ReactElement, useState } from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

export default function Temperature(): ReactElement {
  const [options] = useState<ApexOptions>({
    chart: {
      id: 'temperature',
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#0369A1'],
    stroke: {
      curve: 'straight',
      width: 2
    },
    markers: {
      size: 4,
      hover: {
        size: 6
      }
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value}°C`
      }
    },
    series: [
      {
        name: 'Temperature',
        data: [14, 15, 16, 14, 18, 19, 20]
      }
    ]
  })

  return <Chart options={options} series={options.series} height="200" />
}
