import { ReactElement, useState } from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

interface TemperatureProps {
  categories: string[]
  data: number[]
}

export default function Temperature(props: TemperatureProps): ReactElement {
  const [options] = useState<ApexOptions>({
    chart: {
      id: 'temperature',
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      animations: {
        enabled: false
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
      categories: props.categories
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value}°C`
      }
    },
    series: [
      {
        name: 'Temperature',
        data: props.data
      }
    ]
  })

  return <Chart options={options} series={options.series} height="200" />
}
