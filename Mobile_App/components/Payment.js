import React, { Component } from 'react';
import {  TextInput , View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import 'react-native-gesture-handler';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from "axios";
import LocalIP from "./localIPAddress";

const initialState = {
  cardNumber:'',
  expiryMonth:'',
  expiryYear:'',
  cvc:'',
  name:'',
  amount:'',
  wallet:0,
  message:'',
  showAlert: false,
  title:''
};

export default class Payment extends React.Component {
  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;
    
    this.state = {
      cardNumber:'',
      expiryMonth:'',
      expiryYear:'',
      cvc:'',
      name:'',
      amount:params.amount,
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

  pay = async() =>{
    if (this.state.cardNumber != "") {
      if (this.state.cardNumber.length == 16) {
        if (this.state.name != "") {  
          if (this.state.expiryMonth != "") {  
            if (this.state.expiryYear != "") {  
              if (this.state.cvc != "") {  
                const userId = await AsyncStorage.getItem('userId')
                const url = 'http://'+LocalIP+':3500/Account/'+userId;
                const data = JSON.stringify({
                  userId: userId,
                  balance: this.state.amount
                });
                await axios.put(url,data,{
                    headers: {'Content-Type': 'application/json'}
                })
                .then(async(res) => {
                    console.log(res.data.success)
                    if(res.data.success=="success"){
                      this.setState(initialState)
                      this.setState({
                        title: "Success!",
                        message: "Topup Successful!",
                      });
                      this.showAlert();
                      this.props.navigation.push("Topup")
                    }
                })
              } else {
                this.setState({ title: "Required!", message: "Enter an CVC Code!" });
                this.showAlert();
              }
            } else {
              this.setState({ title: "Required!", message: "Select Expiry Year!" });
              this.showAlert();
            }
          } else {
            this.setState({ title: "Required!", message: "Select Expiry Month!" });
            this.showAlert();
          }
        } else {
          this.setState({ title: "Required!", message: "Enter an Name!" });
          this.showAlert();
        }
      } else {
        this.setState({ title: "Required!", message: "Invalid Card Number!" });
        this.showAlert();
      }
    } else {
      this.setState({ title: "Required!", message: "Enter an Card Number!" });
      this.showAlert();
    }
  }

  render() {
    const {showAlert} = this.state;
    return (
      <View style={styles.container}>
        <Image source={require('./../assets/logo.png')}
          style={{width: 100, height: 100 ,marginBottom:50 }} />
        <View style={{flexDirection: 'row', marginBottom: 30}}>
          <Text style={{ fontWeight: 'bold' , fontSize: 36 }}>Coins : {this.state.amount}</Text>
        </View>
        <TextInput
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
            placeholder={"Name"}
            style={styles.input}
          />
        <TextInput
        value={this.state.cardNumber}
        style={styles.input}
        placeholder="Card Number"
        keyboardType="numeric"
        onChangeText={(cardNumber) => this.setState({ cardNumber }) }
      />
      <View style={styles.expiryContainer}>
        <View>
            <View
              style={[styles.input, styles.expiryInput]}>
              <Picker
                selectedValue={this.state.expiryMonth}
                style={{width: 100 + '%',
                height:45}}
                onValueChange={(itemValue, itemIndex) => this.setState({expiryMonth: itemValue})}
              >
                <Picker.Item label="00" value="" />
                <Picker.Item label="01" value="01" />
                <Picker.Item label="02" value="02" />
                <Picker.Item label="03" value="03" />
                <Picker.Item label="04" value="04" />
                <Picker.Item label="05" value="05" />
                <Picker.Item label="06" value="06" />
                <Picker.Item label="07" value="07" />
                <Picker.Item label="08" value="08" />
                <Picker.Item label="09" value="09" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="11" value="11" />
                <Picker.Item label="12" value="12" />
              </Picker>
            </View>
          </View>
          <View>
            <View
              style={[styles.input, styles.expiryInputForYear]}>
              <Picker
                selectedValue={this.state.expiryYear}
                style={{width: 100 + '%',
                height:45}}
                onValueChange={(itemValue, itemIndex) => this.setState({expiryYear: itemValue})}
              >
                <Picker.Item label="0000" value="" />
                <Picker.Item label="2023" value="2023" />
                <Picker.Item label="2024" value="2024" />
                <Picker.Item label="2025" value="2025" />
                <Picker.Item label="2026" value="2026" />
                <Picker.Item label="2027" value="2027" />
                <Picker.Item label="2028" value="2028" />
                <Picker.Item label="2029" value="2029" />
                <Picker.Item label="2030" value="2030" />
              </Picker>
            </View>
          </View>
      </View>
      <TextInput
        value={this.state.cvc}
        style={styles.input}
        placeholder="CVC"
        keyboardType="numeric"
        onChangeText={(cvc) => this.setState({cvc})}
      />
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.pay}>
          <Text style={{color: '#000000', fontWeight: 'bold'}}>Pay</Text>
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
  expiryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 0,
  },
  expiryInput: {
    width: '60%',
  },
  expiryInputForYear: {
    marginLeft: '-5%',
    width: '65%',
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
  cardStyle: {
    backgroundColor: '#FFFFFF',
  },
  cardField: {
    width: '100%',
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: "#ffd782",
  },
  registerButton: {
    backgroundColor: "#000",
  }
});