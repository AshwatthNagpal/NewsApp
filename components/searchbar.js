import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TextInput,
    FlatList,
    TouchableWithoutFeedback,

} from 'react-native';
import fetchdata from '../apicall';

export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isTrue: true,
            data: [],
            modalVisible: false
        }
    }
    _onpress = () => {
        this.setState(p => ({ isTrue: !p.isTrue, data: [], modalVisible: false }));
    }

    _search = (text) => {
        if (text === '')
            this.setState({ data: [], modalVisible: false })
        else
            fetchdata.MultiSearch(text).then(d => this.setState({ data: d, modalVisible: true }))
    }
    _onpress1 = ({ item }) => {
        this.props.navigation.navigate('webv', {
            uri: item.url
        })
    }
    render() {
        if (this.state.isTrue)
            return (
                <View style={sheet.bar1}>
                    <TouchableWithoutFeedback onPress={() => this.props.opend()}>
                        <Image style={sheet.logo} source={require('../images/reorder.png')} />
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={this._onpress}>
                        <Image style={sheet.searchicon} source={require('../images/search.png')} />
                    </TouchableWithoutFeedback>
                </View>
            );
        else {

            return (
                <View zIndex={30} position={'absolute'}>
                    <View style={sheet.bar2}>
                        <TouchableWithoutFeedback onPress={this._onpress}>
                            <Image style={sheet.searchicon} source={require('../images/backArrow.png')} />
                        </TouchableWithoutFeedback>
                        <View width={270}>
                            <TextInput
                                placeholder='Search....'
                                placeholderTextColor="#6e6f72"
                                autoFocus={true}
                                underlineColorAndroid='#6e6f72'
                                inlineImageLeft='balck_search'
                                inlineImagePadding={5}
                                style={sheet.textinput}
                                onChangeText={(t) => this._search(t)

                                }
                            />

                        </View>
                    </View>

                    <View style={sheet.flat}>
                        <FlatList
                            style={sheet.flatlist}
                            data={this.state.data.articles}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableWithoutFeedback onPress={() => this._onpress1({ item })} >
                                        <View style={sheet.render}>

                                            <Text style={sheet.title}>{item.title}</Text>
                                            <Image style={sheet.poster} source={{ uri: item.urlToImage }} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            }}
                        />
                    </View>

                </View>
            );

        }
    }
}

const sheet = StyleSheet.create({
    bar1: {
        width: Dimensions.get('window').width - 30,
        flexDirection: 'row',
        backgroundColor: "#d6d7db",
        padding: 5,
        elevation: 70,
        alignItems: 'center',
        height: 70,
        borderRadius: 10,
        marginRight: 10,
        marginLeft: 10,
        zIndex: 30,
        position: 'absolute',
    },
    flat: {
        backgroundColor: "white",
        width: Dimensions.get('window').width - 30,
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 20,
        maxHeight: Dimensions.get('window').height - 300,
        position: 'relative'
    },
    textinput: {
        width: 250,
        height: 60,
        marginLeft: 20,
        marginRight: 60,
        color: '#6e6f72',
        fontSize: 20,
        textDecorationLine: 'none'
    },
    bar2: {
        width: Dimensions.get('window').width - 30,
        height: 70,
        flexDirection: 'row',
        backgroundColor: '#d6d7db',
        padding: 5,
        elevation: 70,

        alignItems: 'center',

        borderRadius: 10,
        margin: 10,
    },
    searchicon: {
        width: 30,
        height: 30,
        marginRight: 20
    },
    logo: {
        width: 30,
        height: 30,
        marginLeft: 20,
        marginTop: 7,
        marginRight: Dimensions.get('window').width - 156,
        borderRadius: 30
    },
    flatList: {
        width: Dimensions.get('window').width - 10,
        padding: 10,
        maxHeight: Dimensions.get('window').height - 60,
        backgroundColor: "#d6d7db"
    },
    render: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Dimensions.get('window').width - 50,
        height: 100,
        backgroundColor: "white",
        margin: 10
    },
    poster: {
        width: 60,
        height: 60,

    },
    title: {
        fontSize: 16,
        textAlignVertical: 'center',

        width: Dimensions.get('window').width - 130,

        marginLeft: 4,
        color: 'black'
    }
});