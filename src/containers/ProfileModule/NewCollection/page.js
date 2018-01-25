//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity } from 'react-native';
import I18n from '@language'
import styles from './styles'
import { clone, getDeviceWidth, getDeviceHeight } from '@global'
import { LIGHT_GRAY_COLOR, DARK_GRAY_COLOR } from '../../../theme/colors';
import Modal from 'react-native-modalbox';
import Ionicons from 'react-native-vector-icons/Ionicons'

// create a component
class NewCollection extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        title: '',
        id: 'backButton',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ],
    rightButtons: [
      {
        title: I18n.t('DONE_STR'),
        id: 'add',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ]
  };
  constructor(props) {
    super(props)
    Ionicons.getImageSource('ios-arrow-round-back', 35, DARK_GRAY_COLOR).then(icon => {
      props.navigator.setButtons({
        leftButtons: [{
          icon,
          id: 'backButton',
          disableIconTint: true
        }]
      })
    })
    this.state = {
      isPublic: false,
      isModal: false,
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }
  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        this.props.navigator.pop();
      }
      if (event.id == 'add') {
        if (this.state.name) {
          this.createUserCollection({
            name: this.state.name,
            privacy: this.state.isPublic,
            pictureURL: ''
          });
        } else {
          alert('Please input collection name!')
        }
      }
    }
  }
  createUserCollection(data) {
    this.props.createUserCollection({
      variables: {
        ...data,
        userId: this.props.user.id,
      }
    }).then(collection => {
      let collections = clone(this.props.collections);
      collections.push({
        id: collection.data.createCollection.id,
        type: 'USER',
        ...data
      });
      this.props.saveCollections(collections);
      this.props.navigator.pop();
    })
  }
  onValueChange = (val) => {
    this.setState({
      isModal: val ? true : false,
      isPublic: val
    })
  }
  onModalClosed = () => {
    this.setState({
      isModal: false
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.name}>{I18n.t('NAME_STR')}</Text>
          <TextInput
            style={styles.collectionInput}
            placeholder={I18n.t('COLLECTION_NAME')}
            value={this.state.name}
            onChangeText={text => this.setState({ name: text })}
          />
        </View>
        <View style={styles.privacyContainer}>
          <Text style={styles.name}>{I18n.t('PRIVACY_STR')}</Text>
          <View style={styles.privacy}>
            <Text style={styles.privacyText}>{I18n.t('PRIVACY_DESCRIPTION')}</Text>
            <Switch value={this.state.isPublic} onValueChange={this.onValueChange.bind(this)} />
          </View>
        </View>
        <View style={styles.separate}></View>
        <Modal style={styles.modalContainer} backdrop={true} position={"center"} isOpen={this.state.isModal} onClosed={this.onModalClosed.bind(this)}>
          <Text style={styles.modalTitle}>{I18n.t('COLLECTION_CHANGE_PRIVACY')}</Text>
          <Text style={styles.modalDescription}>{I18n.t('COLLECTION_CHANGE_PRIVACY_DES')}</Text>
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => this.setState({ isModal: false, isPublic: false })}>
              <View style={[styles.modalButton]}>
                <Text style={styles.modalButtonText}>{I18n.t('CANCEL_STR')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ isModal: false })}>
              <View style={[styles.modalButton, styles.leftBorder]}>
                <Text style={[styles.modalButtonText]}>{I18n.t('OK_STR')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

//make this component available to the app
export default NewCollection;
