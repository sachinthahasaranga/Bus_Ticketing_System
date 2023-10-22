import React, { Component } from 'react';
import {  TextInput , View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from "axios";
import LocalIP from "./localIPAddress";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const initialState = {
  key:'',
  scanData:'',
  message:'',
  showAlert: false,
  title:''
};

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    
    this.state = {
      key:params.key,
      scanData:'',
      message:'',
      showAlert: false,
      title:''
    };

  }

  static navigationOptions = ({navigation}) => ({
    title: 'Ticket Details',
    headerStyle: {
      backgroundColor: '#ffd782',
      elevation: 0,
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 24,
    },
    headerLeft: () => (
      <View style={{marginLeft: 10, marginTop:5}}>
        <TouchableOpacity  onPress={ () =>  navigation.navigate('HomePage') }>
          <MaterialCommunityIcons name="menu" color='#000000' size={30} />
        </TouchableOpacity>
      </View>
    )
  });

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
 
  hideAlert = () => {
    this.setState({
      showAlert: false,
      message: '',
      title: ''
    });
  };

  componentDidMount = async() => {
    const url = 'http://'+LocalIP+':3500/Booking/'+this.state.key;
    await axios.get(url,{
        headers: {'Content-Type': 'application/json'}
    })
    .then(async(res) => {
        console.log(res.data)
        this.setState({scanData:"Name : "+res.data[0].route_details.name+"\nDate : "+res.data[0].route_details.date+"\nTime : "+res.data[0].route_details.time+"\nVehicle Number : "+res.data[0].route_details.vehicle_num+"\nDescrption : "+res.data[0].route_details.descrption+"\nNo of Tickets : "+res.data[0].no_of_tickets+"\nTotal : "+(res.data[0].no_of_tickets*1)*(res.data[0].route_details.price*1)+"\nDriver Name : "+res.data[0].route_details.driver})
    })
  }

  render() {
    const {showAlert} = this.state;
    return (
      <View style={styles.container}>
        <Image source={require('./../assets/logo.png')}
          style={{width: 200, height: 200 ,marginBottom:50 }} />
        <View style={{flexDirection: 'row', marginBottom: 30}}>
          <Text style={{ fontWeight: 'bold' , fontSize: 24 }}>{this.state.scanData}</Text>
        </View>

        <AwesomeAlert
            show={showAlert}
            title={this.state.title}
            message={this.state.message}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            cancelText="Close"
            cancelButtonColor="#AEDEF4"
            onCancelPressed={() => {
              this.hideAlert();
            }}
          />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  input: {
    borderBottomWidth: 1,
    width: 80 + '%',
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',
    marginLeft: 4, 
    borderBottomColor: '#c4c4c4',
    color: '#000000'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    width: 80 + '%',
    height: 40,
    borderRadius: 60
  },
  loginButton: {
    backgroundColor: "#ffd782",
  },
  registerButton: {
    backgroundColor: "#000",
  }
});