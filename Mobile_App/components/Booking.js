import React, { Component } from 'react';
import {  TextInput , View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import 'react-native-gesture-handler';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from "axios";
import LocalIP from "./localIPAddress";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const initialState = {
  totalValue:'',
  price:0,
  nTicket:0,
  selectedRoute:'',
  textData:'',
  amount:0,
  wallet:0,
  message:'',
  showAlert: false,
  title:'',
  routeData:[]
};

export default class Topup extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = initialState;

  }

  static navigationOptions = ({navigation}) => ({
    title: 'Ticket Booking',
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

  dataSubmit = async() =>{
    if (this.state.selectedRoute != "") {
      if (this.state.nTicket != "") {
        if ((this.state.wallet*1) >= (this.state.totalValue*1)) {
          const userId = await AsyncStorage.getItem('userId')
          const url = "http://"+LocalIP+":3500/Booking";
          const data = JSON.stringify({
            userId : userId,
            routeId: this.state.selectedRoute,
            no_of_tickets: this.state.nTicket
          });
          console.log(data);
          await axios
            .post(url, data, {
              headers: { "Content-Type": "application/json" },
            })
            .then(async (res) => {
              console.log(res.data);
              if (res.data.err !== "connection") {
                const url1 = 'http://'+LocalIP+':3500/Account/'+userId;
                const data = JSON.stringify({
                  userId: userId,
                  balance: -this.state.totalValue
                });
                await axios.put(url1,data,{
                    headers: {'Content-Type': 'application/json'}
                })
                .then(async(res) => {
                    console.log(res.data.success)
                    if(res.data.success=="success"){
                      this.setState(initialState)
                      this.setState({
                        title: "Success!",
                        message: "Insert Successful!",
                      });
                      this.showAlert()
                      this.componentDidMount()
                    }
                })
              } else {
                this.setState({
                  title: "Validation Error!",
                  message: "Connection Error!",
                });
                this.showAlert();
              }
            });
        } else {
          this.setState({ title: "Error!", message: "Please Topup Your Wallet!" });
          this.showAlert();
        }
      } else {
        this.setState({ title: "Required!", message: "Enter an Ticket Count!" });
        this.showAlert();
      }
    } else {
      this.setState({ title: "Required!", message: "Select Route" });
      this.showAlert();
    }
  }
  
  componentDidMount = async() => {
    const url = 'http://'+LocalIP+':3500/Route/'
    await axios.get(url,{
        headers: {'Content-Type': 'application/json'}
    })
    .then(async(res) => {
        console.log(res.data)
        this.setState({routeData:res.data})
    })
    const userId = await AsyncStorage.getItem('userId')
    const url1 = 'http://'+LocalIP+':3500/Account/user_balance/'+userId;
    await axios.get(url1,{
        headers: {'Content-Type': 'application/json'}
    })
    .then(async(res) => {
        console.log(res.data.balance)
        this.setState({wallet:res.data.balance})
    })
  }

  setRoute = async(id) =>{
    this.setState({selectedRoute:id})
    const url = 'http://'+LocalIP+':3500/Route/'+id
    await axios.get(url,{
        headers: {'Content-Type': 'application/json'}
    })
    .then(async(res) => {
        console.log(res.data)
        this.setState({textData:"Route Name : "+res.data.name+"\nDate : "+res.data.date+"\nTime : "+res.data.time+"\nVehicle Number : "+res.data.vehicle_num+"\nDriver : "+res.data.driver+"\nPrice : "+res.data.price+"\nDescrption : "+res.data.descrption,price:res.data.price})
    })
  }

  textChangeInt = async(text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    const totalValue= await (this.state.price*1)*(numericValue*1);
    this.setState({nTicket:numericValue,totalValue:totalValue})
  };

  render() {
    const {showAlert} = this.state;
    const {routeData} = this.state;
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
                selectedValue={this.state.selectedRoute}
                style={{width: 100 + '%',
                height:45}}
                onValueChange={(itemValue, itemIndex) => this.setRoute(itemValue)}
              >
                <Picker.Item label="Select Route" value="" />
                {

                  routeData.map((record) =>
                  <Picker.Item label={record.name} value={record._id} />

                )}
              </Picker>
            </View>
          </View>
          <Text style={{ fontWeight: 'bold' , fontSize: 18 , marginBottom: 20 }}>{this.state.textData}</Text>

          <TextInput
            value={this.state.nTicket}
            onChangeText={(nTicket) => this.textChangeInt( nTicket )}
            placeholder={"Ticket Count"}
            style={styles.input}
            keyboardType="numeric"
          />

          <Text style={{ fontWeight: 'bold' , fontSize: 18 , marginBottom: 20 }}>{this.state.totalValue}</Text>

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.dataSubmit}>
          <Text style={{color: '#000000', fontWeight: 'bold'}}>Book</Text>
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