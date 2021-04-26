import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, Linking, Alert, TextInput, SafeAreaView, StatusBar, ScrollView, View} from 'react-native';
import {createStackNavigator, HeaderBackButton} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import CustomColor  from '../value/CustomColor';
import { useColorScheme } from 'react-native-appearance';
import  AccountHeader  from './AccountHeader';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : "",
            password : "",
            wrong : false,
        }

        this._checkLogin = this._checkLogin.bind(this);
    }

    render() {
        return (
        <SafeAreaView >
         <StatusBar/>
         <ScrollView
           contentInsetAdjustmentBehavior="automatic"
           >
           <AccountHeader/>
           <View style={[styles.sectionButton]}>
             <Text style={styles.titleText}> Insert your credential: </Text>

               <Text style={styles.text}>Email/username:</Text>
               <TextInput style={styles.input} placeholder="click here to write" onChangeText={(val)=>this.setState({name : val})}/>
               <Text style={styles.text}>Password:</Text>
               <TextInput style={styles.input} placeholder="click here to write" secureTextEntry={true} onChangeText={(val)=>this.setState({password : val})}/>
               {!this.state.wrong ? null :
                <Text style={styles.wrong}>hai sbagliato, riprovare!</Text>}
               <TouchableOpacity style={styles.button} onPress={()=> this._checkLogin()}>
               <Text style={styles.text}>Login</Text>
             </TouchableOpacity>
           </View>
         </ScrollView>
       </SafeAreaView>
        )
    }

    _checkLogin() {
        var users = require("../js/res/json/users.json").users;
        for (let i = 0; i < users.length; i++) {
            if(users[i].name == this.state.name && users[i].password == this.state.password) {
                return this.props.navigation.navigate("Home");
            }
        }
        return this.setState({wrong : true})
    }
}

const styles = StyleSheet.create({

    sectionButton: {
     justifyContent: 'center',
     alignItems: 'center',
     textAlignVertical: 'center',
    },
    titleText: {
     fontSize: 32,
     textAlignVertical: 'center',
     margin: wp('5%')
    },
    highlight: {
      fontWeight: '700',
    },
    button: {
      flexDirection: 'column',
      backgroundColor: CustomColor.lightBlue,
      height: 50,
      width: wp('40%'),
      borderRadius: 60,
      margin: wp('6%'),
      borderColor: CustomColor.black,
    },
    input: {
        flexDirection: 'column',
        backgroundColor: CustomColor.grey,
        height: 50,
        width: wp('80%'),
        borderRadius: 5,
        margin: wp('2%'),
        borderColor: CustomColor.black,
      },
 
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlignVertical: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      marginVertical: hp('1%'),
    },
    wrong: {
        fontSize: 24,
        color: CustomColor.red,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginVertical: hp('1%'),
      },
  });

export default Login;