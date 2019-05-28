import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Animated,
    Text,
    Image,
    Dimensions,
    ToastAndroid,
    TouchableWithoutFeedback
} from 'react-native'

export default class ExpandableView extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <TouchableWithoutFeedback onPress={() => {
                this.props.navigation.navigate('webv', {
                    uri: this.props.data.url
                })
            }}>
                <View style={sheet.container}>

                    <Text style={sheet.title}>{this.props.data.title}</Text>
                    <Image style={sheet.image} source={{ uri: this.props.data.urlToImage }} />
                </View>

            </TouchableWithoutFeedback>
        )



    }


}

const sheet = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width - 20,
        backgroundColor: "#d6d7db",
        elevation: 10,
        borderRadius: 20,
        margin: 10,
        padding: 5,
        height: 130,
        flexDirection: 'row',
    },

    image: {
        width: 100,
        height: 90,
        margin: 5,
        resizeMode: 'stretch'
    },
    title: {
        width: Dimensions.get('window').width - 180,
        fontSize: 15,
        fontWeight: 'bold',
        height: 130,
        margin: 10,
    },
    description: {
        width: Dimensions.get('window').width - 80,
        fontSize: 15,
        color: "#646568",
        margin: 10
    }

})