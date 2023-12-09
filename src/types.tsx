export interface Location {
  name: string
  latitude: number
  longitude: number
}

export interface Forecast {
  date: Date
  forecast: string
  temperature: {
    minimum: number
    maximum: number
    average: number
    values: number[]
  }
  cloudCover: number
  windSpeed: number
}

export type ThemeContextType = {
  darkMode: boolean
  toggleDarkMode: () => void
}

export interface Sensor {
  name: string
  device: string
  sensor: string
}

export interface Measurement {
  starttime: string[]
  unit: string
  value: number[]
}

export interface Alert {
  id: number
  date: Date
  type: string
  color: string
  title: string
  message: string
  unread: boolean
}

export interface Suggestion {
  id: number
  title: string
  text: string
}
