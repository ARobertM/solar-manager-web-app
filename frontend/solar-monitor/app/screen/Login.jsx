import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState }  from 'react'
import Colors from '../../assets/Colors'
import { Input } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      //pentru testare emulator : localhost+port
      //pentru testare android fizic : ip+port: 192.168.0.101:9000
      //TO:DO de rezolvat faza cu IP-ul
        const response = await axios.post('http://192.168.0.103:9000/api/login', {
            UserEmail: email,
            UserPassword: password
        });
        const { token, userId } = response.data;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(userId)); 
        // await AsyncStorage.setItem('userId',userId); 
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        props.navigation.navigate('Tabnavigation', {userId});
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            Alert.alert("Login Failed", error.response.data.message || "An error occurred during login.");
        } else if (error.request) {
            console.log(error.request);
            Alert.alert("Login Failed", "No response from server");
        } else {
            console.log('Error', error.message);
            Alert.alert("Login Error", error.message);
        }
    }
};



  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/adaptive-icon.png')}
        style={styles.logoImage}
      />
      <Text style={styles.fontText}>Welcome to</Text>
      <Text style={styles.fontTitle}>Solis</Text>
      <View style={styles.separator} />

      <View style={styles.formView}>
        <Text style={styles.fontLabel}>Email</Text>
        <Input
          placeholder='Enter your email'
          style={styles.input}
          onChangeText={setEmail} 
        />
        <Text style={styles.fontLabel}>Password</Text>
        <Input
          placeholder='Enter your password'
          secureTextEntry={true}
          onChangeText={setPassword} 
          style={styles.input}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton}>
          <AntDesign name="google" size={24} color="white" />
          <Text style={styles.buttonText}>Log In with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createAccount} onPress= {() => props.navigation.navigate('SignIn') }>
        <Text style={styles.createAccountText}>Create one if you don't have an account</Text>
        </TouchableOpacity>

        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop : 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'pop-regular',
  },
  logoImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  fontText: {
    fontFamily: 'pop-regular',
    fontSize: 25,
  },
  fontTitle: {
    fontFamily: 'pop-semibold',
    fontSize: 40,
    marginTop: -20,
    color: Colors.YELLOW_LIGHT,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  formView: {
    width: '80%',
  },
  fontLabel: {
    fontFamily: 'pop-regular',
    fontSize: 20,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: Colors.YELLOW_LIGHT,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.BLUE,
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'pop-semibold',
    color: 'white',
    marginLeft: 10,
  },
  createAccount: {
    marginTop: 20,
    alignItems: 'center',
  },
  createAccountText: {
    fontFamily: 'pop-regular',
    fontSize: 12,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
