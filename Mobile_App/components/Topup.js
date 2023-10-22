import React, { Component } from 'react';
import {  TextInput , View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from "axios";
import LocalIP from "./localIPAddress";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const initialState = {
  amount:0,
  wallet:0,
  message:'',
  showAlert: false,
  title:''
};

export default class Topup extends React.Component {
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
    title: 'Wallet',
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
    const userId = await AsyncStorage.getItem('userId')
    const url = 'http://'+LocalIP+':3500/Account/user_balance/'+userId;
    await axios.get(url,{
        headers: {'Content-Type': 'application/json'}
    })
    .then(async(res) => {
        console.log(res.data.balance)
        this.setState({wallet:res.data.balance})
    })
  }

  render() {
    const {showAlert} = this.state;
    return (
      <View style={styles.container}>
        <Image source={require('./../assets/logo.png')}
          style={{width: 100, height: 100 ,marginBottom:50 }} />
        <View style={{flexDirection: 'row', marginBottom: 30}}>
          <Text style={{ fontWeight: 'bold' , fontSize: 36 }}>My Wallet Coins</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 30}}>
          <Text style={{ fontWeight: 'bold' , fontSize: 50 }}>{this.state.wallet}</Text>
        </View>
          <TextInput
            value={this.state.amount}
            onChangeText={(amount) => this.setState({ amount })}
            placeholder={"Amount"}
            style={styles.input}
            keyboardType="numeric"
          />
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.changeIterface}>
          <Text style={{color: '#000000', fontWeight: 'bold'}}>Top Up</Text>
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