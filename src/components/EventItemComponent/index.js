//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import CardView from 'react-native-cardview'
import PropTypes from 'prop-types'
import styles from './styles'
import moment from 'moment'
import FontStyle from '../../theme/fonts'
// create a component
class EventItemComponent extends Component {
  constructor(props) {
    super(props)

    this.state={
      active: this.props.data.active == 'ENABLE' ? true : false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      active: nextProps.data.active == 'ENABLE' ? true : false      
    })
  }

  onValueChange = (value) => {
    this.setState({
      active: value
    })
  }
  render() {
    return (
      <CardView style={styles.container}
        cardElevation={2}
        cardMaxElevation={2}
        cornerRadius={5}
      >
        <View>
          <Text style={[FontStyle.MostBig, styles.dayText]}>{moment(this.props.data.fromDateTime).format('D')}
            <Text style={[FontStyle.SubContent, styles.dayText]}>{moment(this.props.data.fromDateTime).format('  MMM YYYY')}</Text>
            <Text style={[FontStyle.MostBig, styles.dayText]}>{moment(this.props.data.toDateTime).format(' - D')}</Text>            
            <Text style={[FontStyle.SubContent, styles.dayText]}>{moment(this.props.data.toDateTime).format('  MMM YYYY')}</Text>            
          </Text>
        </View>
        <View style={[styles.nameTextContainer]}>
          <Text style={[FontStyle.Content, styles.nameText]}>{this.props.data.name}</Text>
        </View>
        <View style={styles.descriptionTextContainer}>
          <Text style={[FontStyle.SubContent, styles.descriptionText]}>{this.props.data.description}</Text>
        </View>
        <View style={styles.activeContainer}>
          <Switch onTintColor="rgb(55, 122, 190)" value={this.state.active} onValueChange={(value) => this.onValueChange(value)}/>
        </View>
      </CardView>
    );
  }
}

EventItemComponent.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    active: PropTypes.string,
    fromDateTime: PropTypes.string,
    toDateTime: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string
  })
}

//make this component available to the app
export default EventItemComponent;
