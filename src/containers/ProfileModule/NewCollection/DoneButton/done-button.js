import React, {Component} from 'react'
import { Text, View, TouchableOpacity,StyleSheet } from 'react-native';

import I18n from '@language'
import { HEADER_COLOR } from '@theme/colors'
import { getDeviceHeight, getDeviceWidth} from '@global'
import { NORMAL_FONT_SIZE, BIG_FONT_SIZE } from '../../../../theme/fonts';

export default class DoneButton extends Component {

    render() {
        return (
            <TouchableOpacity
                style={styles.rightTouchable}
                onPress={() => {
                    (this.props.collection.name !== '' && this.props.user.id) &&
                    this.props.createCollection({
                        variables: {
                            userId: this.props.user.id,
                            name: this.props.collection.name,
                            privacy: this.props.collection.visibility,
                            pictureURL: "https://placeimg.com/640/480/nature/grayscaless",
                        }
                    }).then(res => {
                        this.props.reset()
                    }).catch(error => {
                        console.log(error)
                    })
                }}
            >
                <Text style={styles.rightNav}>
                    {I18n.t('PLACE_KEYWORD_DONE')}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    leftDrawer: {
        marginLeft: getDeviceWidth(74),
        width: getDeviceWidth(72),
        height: getDeviceHeight(57),
        resizeMode: 'contain',
        justifyContent: 'center',
    },
    leftTouchable: {
        width: getDeviceWidth(146),
        height: '100%',
        justifyContent: 'center',
    },
    rightTouchable: {
        width: getDeviceWidth(152),
        marginRight: getDeviceWidth(74),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextArrow: {
        width: getDeviceWidth(48),
        height: getDeviceHeight(38),
        marginRight: getDeviceWidth(86)
    },
    rightNav: {
        fontSize: NORMAL_FONT_SIZE,
        fontWeight: 'bold',
        color: '#575858'
    }
});