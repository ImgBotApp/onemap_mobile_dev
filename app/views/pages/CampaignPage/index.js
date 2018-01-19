import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import Modal from 'react-native-modal';

import { styles } from './styles';
import * as commonStyles from '@global/styles/commonStyles';
import Container from '@layout/Container';
import CampaignItem from '@components/CampaignItem';
import CampaignModal from '@components/CampaignModal';
import MapPage from '../MapPage';
import { Actions } from 'react-native-router-flux';
import I18n from '@i18n';

export default class CampaignPage extends Component {
  constructor(props) {
    super(props);
    this.state ={
      showCampaignModal: false,
    }
  }

  onPressItem() {
    this.setState({showCampaignModal: true});
  }

  hideModal() {
    this.setState({showCampaignModal: false});
  }

  onPressMarker() {
    this.setState({showCampaignModal: false});
    Actions.PlaceDetail();
  }

  render() {
    let data = {
      logo: 'https://picsum.photos/150/300',
      title: 'Lampang City',
      subTitle: 'Town in Thailand',
      description: 'New Travel Experiencec Brings "12 Forbidden Cities ...Missing" Or 12  You can not say no. Bring the highlihghts and identity of the city.'
                + 'The Thai people have not recognized. To fall in love Thailand',
      badge: [
        'https://picsum.photos/400/300',
        'https://picsum.photos/510/300',
        'https://picsum.photos/610/300',
        'https://picsum.photos/620/300',
        'https://picsum.photos/710/300',
        'https://picsum.photos/810/300',
        'https://picsum.photos/820/300',
      ],
      suggestPlace: [
        {
          title: 'Khad Khone Lampania',
          address: 'Talad Gao Rd, Suan Doj, Mueang Lampang, Lampang',
          images: [
            'https://picsum.photos/260/300',
            'https://picsum.photos/210/300',
            'https://picsum.photos/220/300',
            'https://picsum.photos/230/300',
            'https://picsum.photos/240/300',
          ]
        },
        {
          title: 'Khad Khone Lampania',
          address: 'Talad Gao Rd, Suan Doj, Lampang 52100',
          images: [
            'https://picsum.photos/260/300',
            'https://picsum.photos/210/300',
            'https://picsum.photos/220/300',
            'https://picsum.photos/230/300',
            'https://picsum.photos/240/300',
          ]
        },
        {
          title: 'Khad Khone Lampania',
          address: 'Talad Gao Rd, Suan Doj, Lampang 52100',
          images: [
            'https://picsum.photos/260/300',
            'https://picsum.photos/210/300',
            'https://picsum.photos/220/300',
            'https://picsum.photos/230/300',
            'https://picsum.photos/240/300',
          ]
        },
        {
          title: 'Khad Khone Lampania',
          address: 'Talad Gao Rd, Suan Doj,Lampang 52100',
          images: [
            'https://picsum.photos/260/300',
            'https://picsum.photos/210/300',
            'https://picsum.photos/220/300',
            'https://picsum.photos/230/300',
            'https://picsum.photos/240/300',
          ]
        }
      ]
    }

    return (
      <Container title={I18n.t('CAMPAIGN')}>
        <View style={styles.container}>
          <MapPage data={mapData} currentLocation={currentLocation} onPressMarker={(data)=>this.onPressMarker(data)} radius={0} />
          {!this.state.showCampaignModal && (
            <View style={styles.campaignItem}>
              <TouchableOpacity onPress={()=>this.onPressItem()} opacityActivity={0.8}>
                <CampaignItem data={data} />
              </TouchableOpacity>
            </View>
          )}
          <Modal 
            isVisible={this.state.showCampaignModal}
            backdropOpacity={0}
            style={styles.modal}
            onBackdropPress={()=>this.hideModal()}
          >
            <CampaignModal data={data} viewMore={()=>this.onPressMarker()} />
          </Modal>
        </View>
      </Container>
    );
  }
}


let currentLocation = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

let mapData = [
  {
    coordinates: {
      latitude: currentLocation.latitude - 0.01,
      longitude: currentLocation.longitude - 0.01
    }
  },
  {
    coordinates: {
      latitude: currentLocation.latitude + 0.01,
      longitude: currentLocation.longitude + 0.02
    }
  },
  {
    coordinates: {
      latitude: currentLocation.latitude + 0.01,
      longitude: currentLocation.longitude - 0.01
    }
  }
];
