/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import userReducers from '@reducers/userLoginReducers'
import MainRoute from '@routes'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'
const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjb30vkvv434c0146sjjn4d4w' })
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

let store = createStore(combineReducers({userReducers}))

export default class App extends Component<{}> {
  render() {
    return (
      <ApolloProvider client={client} store={store}>
        <NaviState />
      </ApolloProvider>
    );
  }
}

const mapStateToProps = (state) => state
// create a component
class MyClass extends Component {
  render() {
    return (
      <MainRoute />
    );
  }
}

const NaviState = connect(mapStateToProps)(MyClass)