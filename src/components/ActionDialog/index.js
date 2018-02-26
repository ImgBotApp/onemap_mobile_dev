import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modalbox'
import I18n from '@language'
import DFonts from '@theme/fonts';
import styles from './styles'

class ActionDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      selectedIndex: 0
    };
  }

  show() {
    this.setState({ isOpen: true });
  }

  onConfirm() {
    const description = I18n.t('REPORT_' + this.props.type.toUpperCase() + '_DESCRIPTION' + (this.state.selectedIndex + 1));
    Alert.alert(
      'Are you sure you want to submit?',
      description,
      [
        {
          text: 'Confirm', onPress: () => {
            this.props.onConfirm && this.props.onConfirm(description);
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    )
  }

  render() {
    const prefix = 'REPORT_' + (this.props.type ? this.props.type.toUpperCase() : '') + '_';

    return (
      <Modal style={styles.modalContainer} backdrop={true} position={'center'}
        isOpen={this.state.isOpen}
        onClosed={() => this.setState({ isOpen: false })}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{I18n.t(prefix + 'TITLE')}</Text>
          <View style={styles.descriptionContainer}>
            <TouchableOpacity disabled={!this.state.selectedIndex} style={styles.itemContainer} onPress={() => this.setState({ selectedIndex: 0 })}>
              <Icon name={this.state.selectedIndex ? 'ios-checkmark-circle-outline' : 'ios-checkmark-circle'} size={20} />
              <Text style={styles.description}>{I18n.t(prefix + 'DESCRIPTION1')}</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={!!this.state.selectedIndex} style={styles.itemContainer} onPress={() => this.setState({ selectedIndex: 1 })}>
              <Icon name={this.state.selectedIndex ? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline'} size={20} />
              <Text style={styles.description}>{I18n.t(prefix + 'DESCRIPTION2')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={[styles.modalButton, { borderRightWidth: 1 }]}>
            <TouchableOpacity onPress={() => this.setState({ isOpen: false })}>
              <Text style={styles.cancelStr}>{I18n.t('CANCEL_STR')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalButton}>
            <TouchableOpacity onPress={() => {
              this.setState({ isOpen: false });
              this.onConfirm();
            }}>
              <Text style={styles.blockStr}>{'Submit'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ActionDialog;