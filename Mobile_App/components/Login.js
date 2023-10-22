import React, { Component } from 'react';
import { Alert, ActivityIndicator , TextInput, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from "axios";
import LocalIP from "./localIPAddress";

export default class Login extends React.Component {
  
  static navigationOptions = ({ navigation}) => {
    return {
      headerTitle: 'Welcome!, Please login in here!',
      headerStyle: { backgroundColor: '#ffd782' },
      headerTintColor: '#000',
      headerLeft: () => {
        return null;
      }
    }
  };

  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      message:'',
      showAlert: false,
      loader: false,
      title:''
    };

    this.loadData();
  }

  loadData = async() =>{
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn')
    if(isLoggedIn==='true'){
      this.props.navigation.replace('HomePage')
    }
  }
  
  onLogin = async(e) => {
    
    this.setState({loader:true})

    if (this.state.username != "") {
        if (this.state.password != "") {

            const url = "http://"+LocalIP+":3500/User/login";
            const data = JSON.stringify({
              username: this.state.username,
              password: this.state.password
            });
            console.log(data);
            await axios
              .post(url, data, {
                headers: { "Content-Type": "application/json" },
              })
              .then(async (res) => {
                console.log(res.data);
                if (res.data.err !== "connection") {
                  if (res.data.err === "User not found") {
                    this.setState({username:"",loader:false})
                    this.setState({
                      title: "Error!",
                      message: "User not found!",
                    });
                    this.showAlert();
                  } else {
                    if (res.data.err === "Incorrect Password") {
                      this.setState({password:"",loader:false})
                      this.setState({
                        title: "Validation Error!",
                        message: "Incorrect Password!",
                      });
                      this.showAlert();
                    } else {
                      await AsyncStorage.setItem('isLoggedIn','true')
                      await AsyncStorage.setItem('userName',res.data.username)
                      await AsyncStorage.setItem('userId',res.data.id)
                      this.setState({username:"",password:"",loader:false})
                      this.props.navigation.replace('HomePage')
                    }
                  }
                } else {
                  this.setState({
                    title: "Validation Error!",
                    message: "Connection Error!",
                  });
                  this.showAlert();
                }
              });
        } else {
          this.setState({ title: "Required!", message: "Enter an Password!" });
          this.showAlert();
        }
    } else {
      this.setState({ title: "Required!", message: "Enter an Username!" });
      this.showAlert();
    }

  }
  
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
          style={{width: 350, height: 350}} />
        
        <TextInput 
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={ this.onLogin }>
          {!this.state.loader ? (
            <Text style={{color: '#000000', fontWeight: 'bold'}}>Login</Text>
          ) : null}
          {this.state.loader ? (
              <ActivityIndicator size="large" color={"#ffffff"} />
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity onPress={() =>  this.props.navigation.replace('Register')} style={[styles.buttonContainer, styles.registerButton]}> 
          <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Register</Text>
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
    backgroundColor: "#000000",
  }
});