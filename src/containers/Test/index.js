//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import * as appActions from '../../reducers/app/actions'

import { graphql } from 'react-apollo'

import {
  AUTHENTICATE_FACEBOOK_USER
} from '@graphql/users'

// create a component
class TestScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
          this.props.FacebookLogin({
            variables: { facebookToken: 'EAACEdEose0cBAEW8nRefFmNaEKrBOXcYLyRq2zhyNBeLj8FjvQM31VQtxF6ZCNfnhV0EsZCLAWPnZBrFQA9qEp2wazjEMFZCS4OINGZAscT2UFt4fWqbLDIzRK2uNbfJB3llAxb1jO7afwYwJMZBJOlBsK6dN2aTpL9et2nCxEl16Kksf3RlZBLsSaMUI2LzWAZD'}
          })
          this.props.dispatch(appActions.appInitialized())
        }}>
          <Text>Press this</Text>
        </TouchableOpacity>
        <Text>{this.props.root.root}</Text>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

function mapStateToProps(state) {
  console.log(state)
  return {
    root: state.app
  }
}
//make this component available to the app
// export default TestScreen;
const container = graphql(AUTHENTICATE_FACEBOOK_USER, {name: 'FacebookLogin'})(TestScreen)

export default connect(mapStateToProps)(container)
