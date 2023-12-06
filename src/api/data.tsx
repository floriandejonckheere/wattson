import { Location, Sensor, Alert } from '../types'

export const LOCATIONS: { ruissalo: Location; educity: Location } = {
  ruissalo: {
    name: 'Ruissalo',
    latitude: 60.426116973904996,
    longitude: 22.159310892022628
  },
  educity: {
    name: 'EduCity',
    latitude: 60.44751,
    longitude: 22.2982
  }
}

export const SENSORS: { heat_pump: Sensor } = {
  heat_pump: {
    name: 'Heat pump',
    device: 'Tyyssija_Heat_Pump',
    sensor: '131EE01Power'
  }
}

export const ALERTS: Alert[] = [
  {
    id: 1,
    date: new Date(),
    type: 'info',
    color: 'blue',
    title: 'New device',
    message: 'A new device was detected: Smart Hub',
    unread: true
  },
  {
    id: 2,
    date: new Date(),
    type: 'warning',
    color: 'yellow',
    title: 'Energy usage',
    message: 'Heat pump used 13% more energy last month',
    unread: true
  },
  {
    id: 3,
    date: new Date(),
    type: 'error',
    color: 'red',
    title: 'Unplug EV',
    message:
      'Your EV has been fully charged since 2 hours ago, unplug it from the shared charger to allow other residents to use it',
    unread: false
  }
]
