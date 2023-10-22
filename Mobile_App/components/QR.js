import React, { Component } from 'react';
import {  TextInput , View, StyleSheet, TouchableOpacity, Text, Image , Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from "axios";
import LocalIP from "./localIPAddress";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';

const initialState = {
    hasPermission:null,
    scanned:false,
    amount:0,
    wallet:0,
    message:'',
    showAlert: false,
    title:''
};

export default class QR extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount:0,
      wallet:0,
      message:'',
      showAlert: false,
      title:''
    };

  }

  static navigationOptions = ({navigation}) => ({
    title: 'QR Reading',
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

  changeIterface = async() =>{
    if (this.state.amount > 50) {
      this.setState(initialState)
      this.props.navigation.push("Payment",{ amount: this.state.amount })
    } else {
      this.setState({ title: "Required!", message: "Minimum amount 50!" });
      this.showAlert();
    }
  }
  
  componentDidMount = async() => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    console.log(status)
    setState({hasPermission:status})
  }

  handleBarCodeScanned = ({ type, data }) => {
    console.log(data)
    this.props.navigation.push("Details",{ key: data })
  };

  render() {
    const {showAlert} = this.state;
    return (
      <View style={styles.container}>
        <Image source={require('./../assets/logo.png')}
          style={{width: 100, height: 100 ,marginBottom:50 }} />
          <View style={{flexDirection: 'row', marginBottom: 30}}>
            <Text style={{ fontWeight: 'bold' , fontSize: 50 }}>Scan QR</Text>
          </View>
          <View>
        <BarCodeScanner
          onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
          style={{width: 100 + '%', 
            height: Dimensions.get('window').width*0.98 ,
            borderWidth: 1,
            borderColor: '#c4c4c4',
            aspectRatio: 1
            }}
        />
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
  cameraContainer: {
    width: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 40,
  },
  camera: {
    flex: 1,
  },
  registerButton: {
    backgroundColor: "#000",
  }
});