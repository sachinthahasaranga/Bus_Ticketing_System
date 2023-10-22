import React, { Component } from 'react';
import {  View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      message:'',
      showAlert: false,
      title:''
    };

  }

  logout = async() => {
    AsyncStorage.clear();
    this.props.navigation.replace('Login')
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Dashboard',
    headerStyle: {
      backgroundColor: '#ffd782',
      elevation: 0,
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 24,
    },
    headerLeft:false
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

  render() {
    const {showAlert} = this.state;
    return (
      <View style={styles.container}>
        <Image source={require('./../assets/logo.png')}
          style={{width: 200, height: 200 ,marginBottom:50 }} />

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() =>  this.props.navigation.navigate('QR')}>
          <Text style={{color: '#000000', fontWeight: 'bold'}}>QR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() =>  this.props.navigation.navigate('Booking')}>
          <Text style={{color: '#000000', fontWeight: 'bold'}}>Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() =>  this.props.navigation.navigate('MyBooking')}>
          <Text style={{color: '#000000', fontWeight: 'bold'}}>My Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() =>  this.props.navigation.navigate('Topup')}>
          <Text style={{color: '#000000', fontWeight: 'bold'}}>Wallet Top Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, styles.registerButton]} onPress={this.logout}>
          <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Logout</Text>
        </TouchableOpacity>

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