import { ReactElement, useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import apexchart, { ApexOptions } from 'apexcharts'

import { useTheme } from '../../contexts/theme'

interface TemperatureProps {
  categories: string[]
  series: ApexAxisChartSeries
  options?: ApexOptions
}

export default function Temperature(props: TemperatureProps): ReactElement {
  const { darkMode } = useTheme()

  useEffect(() => {
    // here
    apexchart.exec('temperature', 'render')
  }, [darkMode])

  const [options] = useState<ApexOptions>({
    theme: {
      mode: darkMode ? 'dark' : 'light'
    },
    chart: {
      id: 'temperature',
      type: 'line',
      stacked: true,
      background: 'transparent',
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
    colors: ['#0369A1', '#BAE6FD', '#F1F5F9'],
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
      categories: props.categories,
      tickAmount: 9
    },
    yaxis: [
      {
        labels: {
          formatter: (value) => `${Math.round(value)}°C`
        },
        title: {
          text: 'Temperature'
        }
      },
      {
        opposite: true,
        labels: {
          formatter: (value) => `${Math.round(value)} mm`
        },
        title: {
          text: 'Rain'
        }
      },
      {
        opposite: true,
        labels: {
          formatter: (value) => `${Math.round(value)} mm`
        },
        title: {
          text: 'Snowfall'
        }
      }
    ],
    series: props.series,
    ...props.options
  })

  return <Chart options={options} series={options.series} height="200" />
}
