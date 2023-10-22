import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Image , ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from "axios";
import LocalIP from "./localIPAddress";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class MyBooking extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: 'My Bookings',
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

  constructor(props) {
    super(props);

    this.state = {
      bookTempArray: [],
      message:'',
      showAlert: false,
      deleteAlert: false,
      title:'',
      key:'',
      approve:'',
      delete:'',
      deleteColor:'',
      close:'',
      key:'',
    };

    this.loadData();

  }

  componentDidMount = async() => {
    const userId = await AsyncStorage.getItem('userId')
    const url = 'http://'+LocalIP+':3500/Booking/my/'+userId
    await axios.get(url,{
        headers: {'Content-Type': 'application/json'}
    })
    .then(async(res) => {
        console.log(res.data)
        this.setState({bookTempArray:res.data})
    })
  }

  loadData = async() =>{
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn')
    if(isLoggedIn!=='true'){

    }else{
      
    }

  }
  
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  deleteAlert = () => {
    this.setState({
      deleteAlert: true
    });
  };
 
  hideAlert = () => {
    this.setState({
      showAlert: false,
      deleteAlert: false,
      message: '',
      title: ''
    });
  };

  onQr = (key) => {
    this.props.navigation.push("GeneratorQR",{ key: key })
  };

  onDelete = (key) => {
    this.setState({title:"Warring!",approve:"False",message:"If you want delete?",delete:"Delete",deleteColor:"#ff0026",close:"Close",key:key})
    this.deleteAlert()
  };

  deleteItem = async(e) => {

    const url = 'http://'+LocalIP+':3500/Booking/'+this.state.key
    await axios.delete(url,{
        headers: {'Content-Type': 'application/json'}
    })
    .then(async(res) => {
        console.log(res.data)
        this.setState({
          showAlert: true,
          deleteAlert: false,
          title: "Success!",
          message: "Delete Successful!",
        });
        this.componentDidMount()
    })

  };

  render() {
    const {showAlert} = this.state;
    const {deleteAlert} = this.state;
    const {bookTempArray} = this.state;
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Image source={require('./../assets/logo.png')}
            style={{width: 100, height: 100 ,marginBottom:50 }} />

          {
            bookTempArray.map((record) =>
            <View style={{width: 88 + '%',flex: 1, flexDirection: 'row',borderBottomColor: '#bdb9ae',borderBottomWidth: 2,marginBottom:5}}>
              <View style={{width: 60 + '%',marginBottom:5}}>
              <Text style={{color: '#000000', fontWeight: 'bold'}}>Name : {record.route_details.name} {"\n"}Date : {record.route_details.date} {"\n"}Time : {record.route_details.time} {"\n"}Vehicle Number : {record.route_details.vehicle_num} {"\n"}Descrption : {record.route_details.descrption} {"\n"}No of Tickets : {record.no_of_tickets} {"\n"}Total : {(record.no_of_tickets*1)*(record.route_details.price*1)}{"\n"}Driver Name : {record.route_details.driver} </Text>
              </View>
              <View style={{width: 20 + '%'}}>
                <TouchableOpacity style={[styles.listButton, styles.editButton]} onPress={ () => this.onQr(record._id)}>
                  <Text style={{color: '#000000', fontWeight: 'bold'}}>QR</Text>
                </TouchableOpacity>
              </View>
              <View style={{width: 20 + '%'}}>
                <TouchableOpacity style={[styles.listButton, styles.deleteButton]} onPress={() => this.onDelete(record._id)}>
                  <Text style={{color: '#000000', fontWeight: 'bold'}}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <AwesomeAlert
              show={showAlert}
              title={this.state.title}
              message={this.state.message}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              cancelText="Close"
              cancelButtonColor="#00aeff"
              onCancelPressed={() => {
                this.hideAlert();
              }}
            />

          <AwesomeAlert
            show={deleteAlert}
            title={this.state.title}
            message={this.state.message}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            confirmButtonColor="#00aeff"
            showConfirmButton={true}
            showCancelButton={true}
            confirmText= {this.state.close}
            cancelText= {this.state.delete}
            reverseButton={true}
            cancelButtonColor={this.state.deleteColor}
            onCancelPressed={() => 
              { this.deleteItem() }
            }
            onConfirmPressed={() => {
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  listImage : {
    width: 60, 
    height: 60
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
  TextInputStyleClass:{
    borderBottomWidth: 1,
    width: 80 + '%',
    height:100,
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
  listButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    width: 95 + '%', 
    marginTop:10,
    height: 40,
    borderRadius: 10
  },
  loginButton: {
    backgroundColor: "#ffd175",
  },
  editButton: {
    backgroundColor: "#1cd92f",
  },
  viewButton: {
    backgroundColor: "#3489eb",
  },
  deleteButton: {
    backgroundColor: "#ed3228",
  },
  registerButton: {
    backgroundColor: "#000000",
  }
});