
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
      title: 'School Facilities',
      backgroundColor: '#32a699',
      borderBottomColor: '#32a699',
      titleStyle:{color:'#fefefe',fontFamily:'gochi',fontSize:28},
      tintColor: '#fefefe',
    },
  };

  render() {
    return (
                  
        <WebView
        source={{html:'<iframe width="345" height="500" src="https://data.gov.sg/dataset/dus-schools-sports-facilities/resource/51aa80b2-eb1b-4e7e-8e4b-75e7dfec73cf/view/a8036c6b-920c-43af-bb57-8170c441f1c1" frameBorder="0"> </iframe>'}}
        javaScriptEnabledAndroid={true}
        domStorageEnabled={true}
        //startInLoadingState={true}
        />
    
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
