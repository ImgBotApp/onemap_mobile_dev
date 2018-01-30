import React, {
  Component
} from 'react';

import {
  AlertIOS,
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';

import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onBuffer = this.onBuffer.bind(this);


  }
  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    controls: false,
    paused: false,
    skin: 'custom',
    ignoreSilentSwitch: null,
    isBuffering: false,
    loading: true
  };

  onLoad(data) {
    console.log('On load fired!');
    this.setState({ duration: data.duration });
  }

  onProgress(data) {
    this.setState({ currentTime: data.currentTime });
  }

  onBuffer(isBuffering) {
    this.setState({ isBuffering });
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
      return 0;
    }
  }

  renderSkinControl(skin) {
    const isSelected = this.state.skin == skin;
    const selectControls = skin == 'native' || skin == 'embed';
    return (
      <TouchableOpacity onPress={() => {
        this.setState({
          controls: selectControls,
          skin: skin
        })
      }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
          {skin}
        </Text>
      </TouchableOpacity>
    );
  }

  renderRateControl(rate) {
    const isSelected = (this.state.rate == rate);

    return (
      <TouchableOpacity onPress={() => { this.setState({ rate: rate }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
          {rate}x
          </Text>
      </TouchableOpacity>
    )
  }

  renderResizeModeControl(resizeMode) {
    const isSelected = (this.state.resizeMode == resizeMode);

    return (
      <TouchableOpacity onPress={() => { this.setState({ resizeMode: resizeMode }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    )
  }

  renderVolumeControl(volume) {
    const isSelected = (this.state.volume == volume);

    return (
      <TouchableOpacity onPress={() => { this.setState({ volume: volume }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
          {volume * 100}%
          </Text>
      </TouchableOpacity>
    )
  }

  renderIgnoreSilentSwitchControl(ignoreSilentSwitch) {
    const isSelected = (this.state.ignoreSilentSwitch == ignoreSilentSwitch);

    return (
      <TouchableOpacity onPress={() => { this.setState({ ignoreSilentSwitch: ignoreSilentSwitch }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
          {ignoreSilentSwitch}
        </Text>
      </TouchableOpacity>
    )
  }

  renderCustomSkin() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    let isCurrrentVideo = false;
    if (this.props.even != this.props.slider1ActiveSlide)
      isCurrrentVideo = true;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.fullScreen} onPress={() => { this.setState({ paused: !this.state.paused }) }}>
          <Video
            source={{ uri: this.props.videourl }}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused || isCurrrentVideo}
            volume={this.state.volume}
            muted={this.state.muted}
            ignoreSilentSwitch={this.state.ignoreSilentSwitch}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onBuffer={this.onBuffer}
            onProgress={this.onProgress}
            onEnd={() => { //AlertIOS.alert('Done!') 
            }}
            repeat={true}
          />
        </TouchableOpacity>

        <View style={styles.controls}>

          <View style={styles.playControl}>
            <Icon name={this.state.paused ? "play-circle-o" : "stop-circle-o"} onPress={() => { this.setState({ paused: !this.state.paused }) }} style={styles.controlbutton} />
          </View>
          <View style={styles.progress}>
            <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
            <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
          </View>
          <View style={styles.muteControl}>
            <Ionicons name={this.state.volume ? "md-volume-mute" : "md-volume-off"} onPress={() => { this.setState({ volume: this.state.volume ? 0 : 1 }) }} style={styles.controlbutton} />
          </View>
        </View>
        {
          flexCompleted <= 0 && !this.state.paused ? (
            <ActivityIndicator size="large" color="#dddddd" />
          ) : null
        }
      </View>
    );
  }

  renderNativeSkin() {
    const videoStyle = this.state.skin == 'embed' ? styles.nativeVideoControls : styles.fullScreen;
    return (
      <View style={styles.container}>
        <View style={styles.fullScreen}>
          <Video
            source={{ uri: "https://www.w3schools.com/html/mov_bbb.mp4" }}
            style={videoStyle}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            ignoreSilentSwitch={this.state.ignoreSilentSwitch}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onBuffer={this.onBuffer}
            onProgress={this.onProgress}
            onEnd={() => { AlertIOS.alert('Done!') }}
            repeat={true}
            controls={this.state.controls}
          />
        </View>
        <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.skinControl}>
              {this.renderSkinControl('custom')}
              {this.renderSkinControl('native')}
              {this.renderSkinControl('embed')}
            </View>
          </View>
          <View style={styles.generalControls}>
            <View style={styles.rateControl}>
              {this.renderRateControl(0.5)}
              {this.renderRateControl(1.0)}
              {this.renderRateControl(2.0)}
            </View>

            <View style={styles.volumeControl}>
              {this.renderVolumeControl(0.5)}
              {this.renderVolumeControl(1)}
              {this.renderVolumeControl(1.5)}
            </View>

            <View style={styles.resizeModeControl}>
              {this.renderResizeModeControl('cover')}
              {this.renderResizeModeControl('contain')}
              {this.renderResizeModeControl('stretch')}
            </View>
          </View>
          <View style={styles.generalControls}>
            {
              (Platform.OS === 'ios') ?
                <View style={styles.ignoreSilentSwitchControl}>
                  {this.renderIgnoreSilentSwitchControl('ignore')}
                  {this.renderIgnoreSilentSwitchControl('obey')}
                </View> : null
            }
          </View>
        </View>

      </View>
    );
  }

  render() {
    return this.state.controls ? this.renderNativeSkin() : this.renderCustomSkin();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  horizontal: {
    alignSelf: "center"
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 84,
    left: 4,
    right: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlbutton: {
    color: "white",
    fontSize: 25,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center"
  },
  playControl: {
    width: 30,
  },
  progress: {
    flex: 0.9,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  muteControl: {
    width: 30,
  },
  innerProgressCompleted: {
    height: 5,
    backgroundColor: 'blue',
  },
  innerProgressRemaining: {
    height: 5,
    backgroundColor: '#cccccc',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  skinControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ignoreSilentSwitchControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  nativeVideoControls: {
    top: 184,
    height: 300
  }
});
export default VideoPlayer;