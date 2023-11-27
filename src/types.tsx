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
