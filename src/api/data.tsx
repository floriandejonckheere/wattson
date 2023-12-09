import { Location, Sensor, Alert, Suggestion } from '../types'

export const LOCATIONS: Location[] = [
  {
    name: 'Ruissalo',
    latitude: 60.426116973904996,
    longitude: 22.159310892022628
  },
  {
    name: 'EduCity',
    latitude: 60.44751,
    longitude: 22.2982
  },
  {
    name: 'Tyyssija',
    latitude: 0,
    longitude: 0
  }
]

export const SENSORS: Sensor[] = [
  {
    name: 'Heat pump',
    location: LOCATIONS[2],
    device: 'Heatpump_SE_IEM3155',
    sensor: 'P_tot'
  },
  {
    name: 'Ravintola',
    location: LOCATIONS[2],
    device: 'Ravintola_SE_IEM3155',
    sensor: 'P_tot'
  },
  {
    name: 'Kuntosali',
    location: LOCATIONS[2],
    device: 'Kuntosali_SE_IEM3155',
    sensor: 'P_tot'
  },
  {
    name: 'Kauppa',
    location: LOCATIONS[2],
    device: 'Kauppa_SE_IEM3155',
    sensor: 'P_tot'
  }
]

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

export const SUGGESTIONS: Suggestion[] = [
  {
    id: 1,
    title: 'Switch off lights',
    text: 'Switch off lights and electrical appliances when you are not using them. Equipment such as computers, heaters and cooling units use a lot of energy, even when they are in low power or standby mode. Chargers that are plugged in but not in use also consume energy.'
  },
  {
    id: 2,
    title: 'Switch to LED lights',
    text: 'Incandescent bulbs are inefficient and waste a lot of energy as heat. Switch to LED lights, which use 75% less energy and last 25 times longer.'
  },
  {
    id: 3,
    title: 'Air out your home',
    text: 'Air out your home regularly, especially in the winter. This will reduce the need for heating and cooling, and improves the air quality in your home. Airing also reduces the humidity in the air, in turn improving the energy efficiency of your heating or cooling system.'
  },
  {
    id: 4,
    title: 'Conserve energy when cooking',
    text: 'Use the right size of pot or pan for the food you are cooking. Use a lid to keep the heat in. Use the residual heat to finish cooking. Use the microwave instead of the oven when possible. Use the oven fan to circulate the heat. Use the oven light to check on your food instead of opening the door.'
  }
]
