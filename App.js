/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  View
} from 'react-native';
import RootStack from './stacknavigator'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      istrue: true,
    }
    console.disableYellowBox = true;
  
  }
  componentDidMount() {
    setTimeout(() => { this.setState({ istrue: false }) }, 1000);
  }
  render() {
    var c;
    if (this.state.istrue)
      c = <View style={sheet.background}>
        <Image source={require("./images/logo.png")} style={sheet.logo} />
      </View>
    else
      c = <RootStack />
    return (c);
  }
}
const sheet = StyleSheet.create({
  indicator: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get("window").height / 2,
    alignSelf: 'center'
  },
  background: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: "#ffffff",
    justifyContent: 'center',
  },
  logo: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height / 2 - 50,

    alignSelf: 'center'
  }
})

