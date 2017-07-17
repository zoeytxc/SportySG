
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  DatePickerAndroid,
  DrawerLayoutAndroid,
  Image,
  Picker,
  ProgressBarAndroid,
  RefreshControl,
  Slider,
  Switch,
  StatusBar,
  ListView,
  ScrollView,
  TextInput,
  TimePickerAndroid,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  WebView,
  Linking,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';


export default class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Public Facilities',
      backgroundColor: '#32a699',
      borderBottomColor: '#32a699',
      titleStyle:{color:'#fefefe',fontFamily:'gochi',fontSize:28},
      tintColor: '#fefefe',
    },
  };

  render() {
    return (
      
        <WebView
        source={{html:'<iframe width="345" height="500" src="https://data.gov.sg/dataset/sportsg-sport-facilities/resource/32a35960-0bf0-4850-a974-638039279510/view/5dc31b56-34e7-4bcb-aa1b-2dfb3eee83e6" frameBorder="0"> </iframe>'}}
        javaScriptEnabledAndroid={true}
        domStorageEnabled={true}
        //startInLoadingState={true}
        scalesPageToFit={true}
        />
    
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
