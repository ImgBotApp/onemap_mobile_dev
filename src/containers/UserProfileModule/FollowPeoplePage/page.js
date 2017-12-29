//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Tabs from 'react-native-tabs'
import Search from 'react-native-search-box'
import Modal from 'react-native-modalbox'
import FollowerList from '@components/FollowersList'
import FollowingList from '@components/FollowingList'
import styles from './styles'
import { DARK_GRAY_COLOR } from '../../../theme/colors';
import I18n from '@language'
// create a component
class FollowerPeople extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('@assets/images/login/leftNav.png'),
        id: 'backButton',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ]
  };
  constructor (props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))

    this.state = {
      page: 'followers',
      isFollowerDialog: false,
      isFollowingDialog: false
    }
  }
  onNavigatorEvent =(event) => {
    if(event.type = 'BavBarButtonPress') {
      switch(event.id) {
        case 'backButton' : 
          this.props.navigator.pop({})
          return;
      }
    }
  }
  onFollowerBlock =(userData) => {
    this.setState({
      isFollowerDialog: true
    })
  }

  _renderFollowerModal() {
    return (
      <Modal style={styles.modalContainer} backdrop={true} position={'center'} 
      isOpen={this.state.isFollowerDialog}
      onClosed={() => this.setState({isFollowerDialog: false})}
      >
        <View style={styles.FollowerdescriptionContainer}>
          <Text style={styles.BlockTitle}>{'Block: test'}</Text>
          <Text style={styles.BlockDescription}>{I18n.t('SETTING_BLOCKED_USER_DESCRIPTION')}</Text>
        </View>
        <View style={styles.FollowerBottom}>
          
          <View style={[styles.modalButton, {borderRightWidth:1}]}>
            <TouchableOpacity>
              <Text style={styles.cancelStr}>{I18n.t('CANCEL_STR')}</Text>
            </TouchableOpacity>              
          </View>
          
          <View style={styles.modalButton}>
            <TouchableOpacity>
              <Text style={styles.blockStr}>{I18n.t('BLOCKED_STR')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
  _renderFollowingModal() {
    return (
      <Modal style={styles.modalContainer} backdrop={true} position={'center'}
      isOpen={this.state.isFollowingDialog}
      onClosed={() => this.setState({isFollowingDialog: false})} >
        <View style={styles.FollowerdescriptionContainer}>
          <Text style={styles.BlockTitle}>{'Unfollow'}</Text>
          <Text style={styles.BlockDescription}>{I18n.t('SETTING_UNFOLLOW_USER_DESCRIPTION')}</Text>
        </View>
        <View style={styles.FollowerBottom}>          
          <View style={styles.modalButton}>
            <TouchableOpacity onPress={() => this.setState({isFollowingDialog: false})}>
              <Text style={styles.blockStr}>{I18n.t('UNFOLLOW')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
  onFollowingItem=(data) => {
    this.setState({
      isFollowingDialog: true
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{position: 'relative'}}>
          <Tabs selected={this.state.page} style={{backgroundColor: 'white',position: 'relative'}}
            selectedStyle={{color: 'red'}} onSelect={el => this.setState({page: el.props.name})} >
            <Text name="followers"> Followers </Text>
            <Text name="following"> Following </Text>
          </Tabs>
        </View>
        <View style={{height: '100%'}}>
        <Search />
        {
          this.state.page == 'followers' ? 
          <FollowerList onItemPress={this.onFollowerBlock.bind(this)}/> : <FollowingList onFollowing={this.onFollowingItem.bind(this)}/>
        }
        </View>
        {
          this._renderFollowerModal()
        }
        {
          this._renderFollowingModal()
        }
      </View>
      
    );
  }
}

// define your styles


//make this component available to the app
export default FollowerPeople;
