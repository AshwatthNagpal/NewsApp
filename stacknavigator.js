import {createStackNavigator} from 'react-navigation'
import HomeScreen from './Screens/HomeScreen';
import WebV from './Screens/webview';
const RootStack=createStackNavigator({
    Home:HomeScreen,
    webv:WebV
},
{ navigationOptions:{
    header:null
},
   initialRouteName:'Home'
});
export default RootStack;