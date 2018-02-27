//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'
import styles from './styles'

import EventItem from '../../../../components/EventItemComponent'
// create a component
class EventTab extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    return (
      <View style={styles.container}>
      {
        this.props.events && this.props.events.map((item, index) => {
          return (
            <EventItem data={item} key={index}/>
          )
        })
      }
      </View>
    );
  }
}

EventTab.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    active: PropTypes.string,
    fromDateTime: PropTypes.string,
    toDateTime: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string
  }))
}

//make this component available to the app
export default EventTab;
