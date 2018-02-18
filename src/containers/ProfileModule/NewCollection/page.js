//import liraries
import React, { Component, PureComponent } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import CardView from 'react-native-cardview';
import ImagePicker from 'react-native-image-picker'
import Modal from 'react-native-modalbox'
import Ionicons from 'react-native-vector-icons/Ionicons'
import I18n from '@language'
import styles from './styles'
import { clone, getDeviceWidth, getDeviceHeight } from '@global'
import { uploadImage } from '@global/cloudinary';
import { LIGHT_GRAY_COLOR, DARK_GRAY_COLOR } from '@theme/colors';
import DFonts from '@theme/fonts';

class NewCollection extends PureComponent {
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
    });
    this.state = {
      isPublic: !props.collection || !props.collection.privacy,
      name: props.collection ? props.collection.name : '',
      pictureURL: props.collection ? props.collection.pictureURL : '',
      isModal: false,
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }
  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress' && !this.state.isModal) {
      if (event.id == 'backButton') {
        this.props.navigator.pop();
      }
      if (event.id == 'add') {
        if (this.state.name) {
          if (this.state.imageUploading) return;
          this.createUserCollection({
            name: this.state.name,
            privacy: !this.state.isPublic,
            pictureURL: this.state.pictureURL
          });
        } else {
          alert('Please input collection name!')
        }
      }
    }
  }
  createUserCollection(params) {
    this.props.createUserCollection({
      variables: {
        ...params,
        id: this.props.collection ? this.props.collection.id : this.props.user.id,
      }
    }).then(({ data }) => {
      let collections = clone(this.props.collections);
      if (this.props.collection) {
        collections[this.props.collectionIndex] = data.updateOrCreateCollection;
      } else {
        collections.unshift(data.updateOrCreateCollection);
      }
      this.props.saveCollections(collections);
      this.props.navigator.pop();
    }).catch(err => alert(err));
  }
  deleteUserCollection() {
    const { id } = this.props.collection;
    this.props.deleteUserCollection({
      variables: {
        id
      }
    }).then(({ data }) => {
      let collections = this.props.collections.filter(item => item.id !== id);
      this.props.saveCollections(collections);
      this.props.navigator.pop();
    }).catch(err => alert(err));
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
  showImagePicker = () => {
    const options = {
      title: 'Select Cover Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      maxWidth: 540,
      maxHeight: 540
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        this.setState({ imageUploading: true });
        uploadImage(response.data, '#collection').then(url => {
          this.setState({ imageUploading: false });
          if (url) {
            this.setState({ pictureURL: url });
          }
        })
      }
    });
  }
  deleteImage() {
    this.setState({ pictureURL: '' });
  }

  deleteCollection = () => {
    Alert.alert(
      this.state.name,
      'Do you want to remove this collection?',
      [
        { text: 'OK', onPress: () => this.deleteUserCollection() },
        { text: 'Cancel', style: 'cancel' }
      ]
    )
  }

  renderImageView() {
    return (
      <CardView
        style={styles.imageItemContainer}
        cardElevation={this.state.isModal ? 0 : 3}
        cardMaxElevation={3}
        cornerRadius={10}
      >
        <TouchableOpacity
          style={{ alignItems: 'center', justifyContent: 'center' }}
          onPress={this.showImagePicker}
          onLongPress={() => this.state.pictureURL && this.deleteImage()}
        >
          <Image
            source={this.state.pictureURL ? { uri: this.state.pictureURL } : require('@assets/images/blankImage.png')}
            style={styles.imageItem}
          />
          {this.state.imageUploading &&
            <ActivityIndicator
              size='large'
              style={{ position: 'absolute' }}
            />
          }
        </TouchableOpacity>
      </CardView>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={[DFonts.Title, styles.name]}>{I18n.t('NAME_STR')}</Text>
          <TextInput
            style={[DFonts.Regular, styles.collectionInput]}
            placeholder={I18n.t('COLLECTION_NAME')}
            value={this.state.name}
            onChangeText={text => this.setState({ name: text })}
          />
        </View>
        <View style={styles.privacyContainer}>
          <Text style={[DFonts.Title, styles.name]}>{I18n.t('PRIVACY_STR')}</Text>
          <View style={styles.privacy}>
            <Text style={[DFonts.Regular, styles.privacyText]}>{I18n.t('PRIVACY_DESCRIPTION')}</Text>
            <Switch value={this.state.isPublic} onValueChange={this.onValueChange.bind(this)} />
          </View>
        </View>
        <View style={styles.separate}></View>
        {this.renderImageView()}
        {this.props.collection &&
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={styles.deleteContainer} onPress={this.deleteCollection}>
              <Text style={styles.deleteText}>
                {'Delete Collection'}
              </Text>
            </TouchableOpacity>
          </View>
        }

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
