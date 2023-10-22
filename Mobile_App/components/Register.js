import React from "react";
import { TextInput, View, ActivityIndicator , StyleSheet, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import {Picker} from '@react-native-picker/picker';
import RadioForm from "react-native-simple-radio-button";
import AwesomeAlert from "react-native-awesome-alerts";
import axios from "axios";
import LocalIP from "./localIPAddress";

const initialState = {
  phone: "",
  name: "",
  password: "",
  nic_or_pass: "",
  username: "",
  country: "",
  cpassword: "",
  success: false,
  message: "",
  showAlert: false,
  loader: false,
  title: "",
};

export default class Register extends React.Component {

  state = initialState;

  static navigationOptions = ({ navigation}) => {
    return {
      headerTitle: 'Welcome!, Please here Register',
      headerStyle: { backgroundColor: '#ffd782' },
      headerTintColor: '#000',
      headerLeft: () => {
        return null;
      }
    }
  };

  constructor(props) {
    super(props);
  }

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
      message: "",
      title: "",
    });
    if(this.state.success==true){
      this.props.navigation.replace("Login")
    }
  };

  onRegister = async(e) => {
    if (this.state.phone != "") {
      if (this.state.phone.length == 10) {
        if (this.state.username != "") {
          if (this.state.name != "") {
            if (this.state.password != "") {
              if (this.state.cpassword != "") {
                if (this.state.password == this.state.cpassword) {

                    this.setState({loader:true})

                    const url = "http://"+LocalIP+":3500/User";
                    const data = JSON.stringify({
                      name: this.state.name,
                      nic_or_pass: this.state.nic_or_pass,
                      phone: this.state.phone,
                      username: this.state.username,
                      password: this.state.password,
                      country: this.state.country
                    });
                    console.log(data);
                    await axios
                      .post(url, data, {
                        headers: { "Content-Type": "application/json" },
                      })
                      .then(async (res) => {
                        console.log(res.data);
                        if (res.data.err !== "connection") {
                          if (res.data.err === "username") {
                            this.setState({username:"",loader:false})
                            this.setState({
                              title: "Error!",
                              message: "Username Already Exists!",
                            });
                            this.showAlert();
                          } else if (res.data.err !== "already") {
                            this.setState(initialState)
                            this.setState({
                              title: "Success!",
                              message: "Register Successful!",
                            });
                            this.showAlert();
                          } else {       
                            this.setState({loader:false})
                            this.setState({
                              title: "Validation Error!",
                              message: "Already Exists!",
                            });
                            this.showAlert();
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
                  this.setState({
                    title: "Error!",
                    message: "Password & Confirm Password Not Equals!",
                  });
                  this.showAlert();
                }
              } else {
                this.setState({
                  title: "Required!",
                  message: "Enter an Confirm Password!",
                });
                this.showAlert();
              }
            } else {
              this.setState({ title: "Required!", message: "Enter an Password!" });
              this.showAlert();
            }
          } else {
            this.setState({ title: "Required!", message: "Enter an Name!" });
            this.showAlert();
          }
        } else {
          this.setState({ title: "Required!", message: "Enter an Username!" });
          this.showAlert();
        }
      } else {
        this.setState({ title: "Required!", message: "Enter an Valid Phone!" });
        this.showAlert();
      }
    } else {
      this.setState({ title: "Required!", message: "Enter an Phone!" });
      this.showAlert();
    }
  };

  render() {
    const { showAlert } = this.state;
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Image
            source={require('./../assets/logo.png')}
            style={{ width: 350, height: 350 }}
          />

          <TextInput
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
            placeholder={"Name"}
            style={styles.input}
          />

          <TextInput
            value={this.state.nic_or_pass}
            onChangeText={(nic_or_pass) => this.setState({ nic_or_pass })}
            placeholder={"NIC or Passport"}
            style={styles.input}
          />

          <View>
            <View
              style={{
                borderBottomWidth: 1,
                width: 80 + '%',
                height:45,
                marginBottom:20,
                flexDirection: 'row',
                alignItems:'center',
                borderBottomColor: '#c4c4c4',
                color: '#000000'
              }}>
              <Picker
                selectedValue={this.state.country}
                style={{width: 100 + '%',
                height:45}}
                onValueChange={(itemValue, itemIndex) => this.setState({country: itemValue})}
              >
                <Picker.Item label="Select Country" value="" />
                <Picker.Item label="Sri Lanka" value="Sri Lanka" />
                <Picker.Item label="India" value="India" />
              </Picker>
            </View>
          </View>

          <TextInput
            value={this.state.phone}
            onChangeText={(phone) => this.setState({ phone })}
            placeholder={"Phone Number"}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            placeholder={"Username"}
            style={styles.input}
          />

          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={"Password"}
            secureTextEntry={true}
            style={styles.input}
          />
          <TextInput
            value={this.state.cpassword}
            onChangeText={(cpassword) => this.setState({ cpassword })}
            placeholder={"Confirm Password"}
            secureTextEntry={true}
            style={styles.input}
          />

          <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.onRegister} >
              {!this.state.loader ? (
                <Text style={{ color: "#000000", fontWeight: "bold" }}>Register</Text>
              ) : null}
              {this.state.loader ? (
                  <ActivityIndicator size="large" color={"#ffffff"} />
              ) : null}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.replace("Login")} style={[styles.buttonContainer, styles.registerButton]} >
            <Text style={{ color: "#ffffff", fontWeight: "bold" }}>Login</Text>
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  btn: {
    flexDirection: "row",
  },
  input: {
    borderBottomWidth: 1,
    width: 80 + "%",
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 4,
    borderBottomColor: "#c4c4c4",
    color: "#000000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 80 + "%",
    height: 40,
    borderRadius: 60,
  },
  loginButton: {
    backgroundColor: "#ffd782",
  },
  registerButton: {
    backgroundColor: "#000",
  },
});
