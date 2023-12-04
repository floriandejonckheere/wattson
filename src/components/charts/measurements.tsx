import { ReactElement, useState } from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

interface MeasurementProps {
  categories: string[]
  series: { name: string; data: number[] }[]
  unit: string
}

export default function Measurements(props: MeasurementProps): ReactElement {
  const [options] = useState<ApexOptions>({
    chart: {
      id: 'measurements',
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
      type: 'datetime',
      categories: props.categories,
      tickAmount: 6
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value.toFixed(1)} ${props.unit}`
      }
    },
    series: props.series
  })

  return <Chart options={options} series={options.series} height="200" />
}
