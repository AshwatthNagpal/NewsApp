import React, { Component } from 'react'
import { WebView, StyleSheet, Dimensions } from 'react-native'

export default class WebV extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <WebView
                source={{ uri: this.props.navigation.getParam('uri', '') }}
                style={sheet.web}
            />
        )
    }
}
const sheet = StyleSheet.create({
    web: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

    }
})