import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableWithoutFeedback,
    NetInfo,
    Image,
    StyleSheet,
    DrawerLayoutAndroid,
    FlatList,
    Alert,
    Button,
    AsyncStorage,
    Picker,
    Dimensions,
    ToastAndroid,
    ActivityIndicator,
} from 'react-native'
import fetchdata from '../apicall'
import SearchBar from '../components/searchbar'
import ExpandableView from '../components/expandable_view'
export default class HomeScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            news: null,
            istrue1: true,
            istrue2: true,
            article: null,
            sources: [],
            language: 'en',
            country: 'in',
            source: '',
            category: ''
        }
        // check whether mobile is connected to internet or not
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            if (connectionInfo.type == 'none') {
                alert("device is offline")
                this.setState({ istrue1: false, istrue2: false })
            }

        });
        // adds listeners to constantly check device internet connectivity 
        NetInfo.addEventListener(
            'connectionChange',
            this.ConnectivityChange   // callback fucntion called when ever connection changes 
        );

        // Retrive language, category, source and country previously selected by user

        AsyncStorage.getItem('language').then(p => {
            this.setState({ language: p })
        }
        ).then(() =>
            AsyncStorage.getItem('category').then(p =>
                this.setState({ category: p })
            )).then(() =>
                AsyncStorage.getItem('source').then(p =>
                    this.setState({ source: p })
                )).then(() =>
                    AsyncStorage.getItem('country').then(p =>
                        this.setState({ country: p })
                    )).then(() => this.callfetch()).then(() => this.fetchsources())

    }

    // Get sources from backend
    fetchsources() {

        let s = this.state;
        fetchdata.getSources(
            s.category, s.language, s.country
        ).then(q => {
            if (q.status == 'ok')
                this.setState({ sources: q.sources, istrue2: false })
        })

    }

    // fetch top headlines from backend
    callfetch() {
        let s = this.state;
        fetchdata.getTopHeadline(
            s.source, s.category, s.language, s.country
        ).then(q => {
            if (q.status == "ok")
                this.setState({ article: q.articles, istrue1: false })
            else {
                this.setState({ istrue1: false, istrue2: false })
                ToastAndroid.show('Error', ToastAndroid.SHORT);
            }
        }).catch(e => alert(e))

    }
    ConnectivityChange = (connectionInfo) => {
        if (connectionInfo.type == 'wifi' || connectionInfo.type == 'cellular') {
            this.callfetch()

        }
    }




    render() {
        var cat = ["business", "entertainment", "general", "health", "science", "sports", "technology"]
        var language = [
            { id: 'ar', lang: "Arabic" },
            { id: 'de', lang: "German" },
            { id: 'en', lang: "English" },
            { id: 'es', lang: "Spanish" },
            { id: 'fr', lang: "French" },
            { id: 'he', lang: "Hebrew" },
            { id: 'it', lang: "Lithuanian" },
            { id: 'nl', lang: "Dutch" },
            { id: 'no', lang: "Norwegian" },
            { id: 'pt', lang: "Portuguese" },
            { id: 'ru', lang: "Russian" },
            { id: 'se', lang: "Sami" },
            { id: 'ud', lang: "Urdu" },
            { id: 'zh', lang: "Chinese" }
        ]

        var cou = [
            { "Code": "AR", "Name": "Argentina" },
            { "Code": "AU", "Name": "Australia" },
            { "Code": "AT", "Name": "Austria" },
            { "Code": "BE", "Name": "Belgium" },
            { "Code": "BR", "Name": "Brazil" },
            { "Code": "BG", "Name": "Bulgaria" },
            { "Code": "CA", "Name": "Canada" },
            { "Code": "CN", "Name": "China" },
            { "Code": "CO", "Name": "Colombia" },
            { "Code": "CU", "Name": "Cuba" },
            { "Code": "CZ", "Name": "Czech Republic" },
            { "Code": "EG", "Name": "Egypt" },
            { "Code": "FR", "Name": "France" },
            { "Code": "DE", "Name": "Germany" },
            { "Code": "GR", "Name": "Greece" },
            { "Code": "HK", "Name": "Hong Kong" },
            { "Code": "HU", "Name": "Hungary" },
            { "Code": "IN", "Name": "India" },
            { "Code": "ID", "Name": "Indonesia" },
            { "Code": "IE", "Name": "Ireland" },
            { "Code": "IL", "Name": "Israel" },
            { "Code": "IT", "Name": "Italy" }, { "Code": "JP", "Name": "Japan" },
            { "Code": "KR", "Name": "Korea, Republic of" },
            { "Code": "LV", "Name": "Latvia" },
            { "Code": "MY", "Name": "Malaysia" },
            { "Code": "MX", "Name": "Mexico" },
            { "Code": "MA", "Name": "Morocco" },
            { "Code": "NL", "Name": "Netherlands" },
            { "Code": "NZ", "Name": "New Zealand" },
            { "Code": "NO", "Name": "Norway" },
            { "Code": "PH", "Name": "Philippines" },
            { "Code": "PL", "Name": "Poland" },
            { "Code": "PT", "Name": "Portugal" },
            { "Code": "RO", "Name": "Romania" },
            { "Code": "RU", "Name": "Russian Federation" },
            { "Code": "SA", "Name": "Saudi Arabia" },
            { "Code": "RS", "Name": "Serbia" },
            { "Code": "SG", "Name": "Singapore" },
            { "Code": "SK", "Name": "Slovakia" },
            { "Code": "SI", "Name": "Slovenia" },
            { "Code": "ZA", "Name": "South Africa" },
            { "Code": "SE", "Name": "Sweden" },
            { "Code": "CH", "Name": "Switzerland" },
            { "Code": "TW", "Name": "Taiwan, Province of China" },
            { "Code": "TH", "Name": "Thailand" },
            { "Code": "TR", "Name": "Turkey" },
            { "Code": "UA", "Name": "Ukraine" },
            { "Code": "AE", "Name": "United Arab Emirates" },
            { "Code": "GB", "Name": "United Kingdom" },
            { "Code": "US", "Name": "United States" },
            { "Code": "VE", "Name": "Venezuela, Bolivarian Republic of" }]


        var show
        var navigationView = (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Image style={sheet.logo} source={require('../images/logo.png')} />
                <Text style={sheet.t}>Country</Text>
                <Picker
                    selectedValue={this.state.country}
                    style={{ height: 50, width: 300 }}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({ country: itemValue })
                        AsyncStorage.setItem('country', itemValue).then(
                            () => this.fetchsources()
                        )

                    }
                    }>
                    <Picker.Item label={"Default"} value={"Default"} />
                    {cou.map(item => <Picker.Item label={item.Name} value={item.Code} />)}
                </Picker>
                <Text style={sheet.t}>Language</Text>
                <Picker
                    selectedValue={this.state.language}
                    style={{ height: 50, width: 300 }}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({ language: itemValue })
                        AsyncStorage.setItem('language', itemValue).then(
                            () => this.fetchsources()
                        )

                    }}>
                    <Picker.Item label={"Default"} value={"Default"} />
                    {
                        language.map(item => <Picker.Item label={item.lang} value={item.id} />)

                    }
                </Picker>
                <Text style={sheet.t}>Category</Text>
                <Picker
                    selectedValue={this.state.category}
                    style={{ height: 50, width: 300 }}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({ category: itemValue })
                        AsyncStorage.setItem('category', itemValue).then(
                            () => this.fetchsources()
                        )
                    }}>
                    <Picker.Item label={"Default"} value={"Default"} />
                    {
                        cat.map(item => <Picker.Item label={item} value={item} />)}
                </Picker>
                <Text style={sheet.t}>Source</Text>
                <Picker
                    selectedValue={this.state.source}
                    style={{ height: 50, width: 300 }}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({ source: itemValue })
                        AsyncStorage.setItem('source', itemValue)
                    }}>
                    <Picker.Item label={"Default"} value={"Default"} />
                    {this.state.sources.map(item => <Picker.Item label={item.name} value={item.id} />)

                    }


                </Picker>
                <View style={{ height: 50, width: 150, margin: 10, }}>
                    <Button title={"Reset"} onPress={() => this.callfetch()} />
                </View>
            </View>
        );


        if (this.state.istrue1 || this.state.istrue2)
            show = <ActivityIndicator size={70} color={"#3b3c3f"} style={sheet.indicator} animating={this.state.istrue1 || this.state.istrue2} />

        else
            show = <DrawerLayoutAndroid
                drawerWidth={300}
                ref={'DRAWER'}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}

            >

                <View>
                    <SearchBar navigation={this.props.navigation} opend={() => this.refs['DRAWER'].openDrawer()} />

                    <FlatList
                        style={{ marginTop: 80 }}
                        data={this.state.article}
                        renderItem={({ item }) =>
                            (
                                <ExpandableView data={item} navigation={this.props.navigation} />
                            )
                        }
                    />
                </View>
            </DrawerLayoutAndroid>

        return (show);
    }
}

const sheet = StyleSheet.create({
    indicator: {
        width: Dimensions.get('window').width,
        height: Dimensions.get("window").height,
        alignSelf: 'center'
    },
    background: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: "#ffffff"
    },
    logo: {
        width: 280,
        height: 200,
        borderBottomColor: '#000000',
        borderBottomWidth: 5,
        alignSelf: 'center'
    },
    search: {
        width: 50,
        height: 30,
        margin: 10
    },
    t: {
        fontSize: 18,
        fontWeight: 'bold',
        height: 30,
        elevation: 10,
        marginLeft: 10
    }

})
