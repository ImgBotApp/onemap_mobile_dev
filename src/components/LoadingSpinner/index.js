//import liraries
import React, { Component } from 'react';
import { View, ActivityIndicator} from 'react-native';
import styles from './styles'
// create a component
class LoadingSpinner extends Component {
  constructor (props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}


//make this component available to the app
export default LoadingSpinner;
