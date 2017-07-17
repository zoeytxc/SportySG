
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
  FlatList,
  Animated,
} from 'react-native';
import React from 'react';
import fetchWeather from "../api/api"
import {fetchWeatherType , fetchTemperature , fetchWindSpeed , fetchPsi} from "../api/api"

export default class LinksScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Search',
      backgroundColor: '#32a699',
      borderBottomColor: '#32a699',
      titleStyle:{color:'#fefefe',fontFamily:'gochi',fontSize:28},
      tintColor: '#fefefe',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      windSpeed: 0,
      psi: 0,
      warn: false,
      hot: false,
      swimming: true,
      badminton: true,
      jogging: true,
      basketball: true,
      weatherType: "Loading",
      temperature: 'Loading',
      searchedCity: "Ang Mo Kio",
      val: new Animated.Value(0),
      currentColor: "rgba(255,255,255,0.5)",
      nextColor: this._randomColor(),
      recommended: 'Loading',
    };
  };

  gettime() {
    var currentdate = new Date(); 
    var datetime = currentdate.getFullYear() + '-'
                    + (currentdate.getMonth()+1) + '-'
                    + currentdate.getDate() + 'T'
                    + currentdate.getHours() + '-'
                    + currentdate.getMinutes() + '-'
                    + currentdate.getSeconds();
    return datetime;  
  };

  getWeather() {
    /*fetchWeather(this.state.searchedCity).then((response) => {
      let weatherList = response

      // Store nextColor, since we'd like to start next time with it.
      var current = this.state.nextColor;

      // Reset animation
      this.state.val.setValue(0);

      

      this.setState({
        temperature: weatherList.main.temp,
        city: weatherList.name,
        country: weatherList.sys.country,
        weatherType: weatherList.weather[0].main,
        currentColor: current,
        nextColor: this._randomColor(),
        
      });

    });*/

    fetchWeatherType().then((response) => {
      let rawList = response
      var collectionList = rawList.items[0];
      var i='';
      var f='';
      for (i in collectionList.forecasts){
        if (collectionList.forecasts[i].area==this.state.searchedCity){
          this.setState({
            weatherType: collectionList.forecasts[i].forecast,
          });
          f = '1';
        };

      };
      if (f == ''){
        this.setState({
            weatherType: 'Loading',
          });
        //console.log(collectionList.forecasts[0].forecast)
      };

    });

    fetchTemperature().then((response) => {
      let rawList = response
      var collectionList = rawList.items[0];
      var i='';
      var f='';
    
      if (f == ''){
        this.setState({
            temperature: collectionList.readings[0].value,
          });
        //console.log(collectionList.readings[0].value)
      };
      if (this.state.temperature>30){
        this.setState({
            hot: true,
          });
      };
      if (this.state.temperature>35){
        this.setState({
            basketball: false,
          });
      };

    });

    fetchWindSpeed().then((response) => {
      let rawList = response
      var collectionList = rawList.items[0];
      var i='';
      var f='';
    
      if (f == ''){
        this.setState({
            windSpeed: Math.round((collectionList.readings[0].value+collectionList.readings[1].value+collectionList.readings[2].value+collectionList.readings[3].value)/4),
          });
        console.log(collectionList.readings[0].value)
      };
      if (this.state.windSpeed>10){
        this.setState({
            badminton: false,
          });
        };
    });

    fetchPsi().then((response) => {
      let rawList = response
      var collectionList = rawList.items[0];
      var i='';
      var f='';
    
      if (f == ''){
        this.setState({
            psi: collectionList.readings.psi_twenty_four_hourly.national,
          });
        //console.log(collectionList.readings.psi_twenty_four_hourly.national)
      };

      if (this.state.psi>100){
        this.setState({
            warn: true,
          });
        };

      if (this.state.warn == true){
        this.setState({
          recommended: 'Ooops the air condition seems to be not very good. Please stay indoor for your health and safety.',
        });
      }else{
        if (this.state.badminton == true){
          this.setState({
            recommended: '\n      Badminton ',
          });
        };
        if (this.state.jogging == true){
          this.setState({
            recommended: this.state.recommended+'Jogging ',
          });
        };
        if (this.state.basketball == true){
          this.setState({
            recommended: this.state.recommended+'Basketball ',
          });
        };
        if (this.state.swimming == true){
          this.setState({
            recommended: this.state.recommended+'Swimming ',
          });
        };
        if (this.state.hot == true){
          this.setState({
            recommended: this.state.recommended+'\n\n      It is quite hot today! Remember to stay hydrated!',
          });
        };


      }

    });

  };

  
    
  render() { 
    var backgroundColor = this.state.val.interpolate({
        inputRange: [0, 1],
        outputRange: [
          this.state.currentColor,
          this.state.nextColor
        ],
      });

    Animated.spring(this.state.val, {
      tension: 1,
      friction: 20,
      toValue: 1
    }).start();

     

    return (  
      <Animated.View style={{
        backgroundColor: '#D6EDEA',
        flex: 1, 
        alignItems: "stretch",
        justifyContent: "center"}}>
        <View>
          <View style={[styles.animatedContainer]}>
            <Text style={styles.textin}>
              {'        Enter location to search: (e.g. Boon Lay)'}
            </Text> 
            <TextInput style={styles.input}
                       onChangeText={(searchedCity) => this.setState({searchedCity:searchedCity})}
                       onSubmitEditing={this.getWeather()}   
                       clearButtonMode={"always"}
                       clearTextOnFocus={true}
                       enablesReturnKeyAutomatically={true}
                       returnKeyType={"search"}/>  
            <Text style={styles.temperature}>
              {'      Temperature: '+Math.round(this.state.temperature) + "°C"}
            </Text>       
            <Text style={styles.location}>
              {'      Wind Speed: '+this.state.windSpeed}
            </Text>
            <Text style={styles.location}>
              {'      Average PSI: '+this.state.psi}
            </Text>
            <Text style={styles.weatherType}>  
              {'      2 Hour Weather Forecast: '+this.state.weatherType}  
            </Text> 
            <Text style={styles.temperature}>  
              {'      Recommended Sports: '+this.state.recommended}
            </Text> 
            <Text style={styles.weatherType}>  
            {'    '}
            </Text>  
            
          </View>
        </View>  
      </Animated.View>
    );

  };

  

  _randomColor() {
    var colors = [0, 1, 2].map(() => Math.ceil(Math.random() * 255));

    return "rgba(" + colors.join(",") + ",0.6)"
  }
    

}



var styles = StyleSheet.create({
  animatedContainer: {
    
    alignItems: "flex-start",
    justifyContent: "center"
  },
  temperature: {
    color: '#32a699',
    fontSize: 20,
    fontWeight: "100",
    marginTop: 15,
    marginBottom: 15,
    fontFamily: 'space-mono',
  },
  textin: {
    color: '#32a699',
    fontSize: 15,
    marginBottom: 0,
    fontFamily: 'space-mono',
  },
  location: {
    color: '#32a699',
    fontSize: 20,
    fontWeight: "100",
    marginBottom: 15,
    fontFamily: 'space-mono',
  },
  weatherType: {
    color: '#32a699',
    fontSize: 20,
    fontFamily: 'space-mono',
  },
  input: {
    color: '#32a699',
    width: 200,
    borderWidth: 1,
    borderColor: '#32a699',
    height: 40,
    marginVertical: 0,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontFamily: 'space-mono',
    fontSize: 20,
  },
  
});