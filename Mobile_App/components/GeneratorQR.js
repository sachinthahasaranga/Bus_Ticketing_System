import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, TouchableOpacity, Text, Image , AsyncStorage } from 'react-native';
import 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class GeneratorQR extends React.Component {
    constructor(props) {
        super(props);

        const { params } = this.props.navigation.state;

        this.state = {
            key:params.key,
            qrCode:null,
            message:'',
            showAlert: false,
            title:''
        };
    }

    componentDidMount = async() => {
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Generated QR',
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

    render() {
        return (
        <View style={styles.container}>
            <Image source={require('./../assets/logo.png')}
            style={{width: 80 + '%', height: 300}} />
            <View style={{flexDirection: 'row', marginBottom: 30}}>
            <Text style={{ fontWeight: 'bold' , fontSize: 30 }}>Generator QR</Text>
            </View>
            
<QRCode
          value={this.state.key}
          size={250}
          bgColor="#000"
          fgColor="#fff"
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
    width: 30 + '%',
    height: 40,
    borderRadius: 60
  },
  loginButton: {
    backgroundColor: "#ffd782",
  }
});