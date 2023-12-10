import React, { createContext, useContext, useState } from 'react'

import { Alert } from '../types'
import { ALERTS } from '../api/data'

type AlertContextType = {
  alerts: Alert[]
  markAsRead(alert: Alert): void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

type AlertProviderProps = {
  children: React.ReactNode
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>(ALERTS)

  const markAsRead = (alert: Alert) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((a) => (a.id === alert.id ? { ...a, unread: false } : a))
    )
  }

  return (
    <AlertContext.Provider value={{ alerts, markAsRead }}>
      {children}
    </AlertContext.Provider>
  )
}

export const useAlerts = () => {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error('useAlerts must be used within an AlertProvider')
  }
  return context
}
