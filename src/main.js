import { Navigation } from 'react-native-navigation'

import TestSceen from '@containers/Test'

export default () => {
  Navigation.registerComponent('TestScreen', () => TestSceen);

  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'test',
        screen: 'TestScreen'
      }
    ]
  })
}