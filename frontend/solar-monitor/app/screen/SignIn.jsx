import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../assets/Colors'
import { Input } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';

export default function SignIn(props) {
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
        <Text style={styles.fontLabel}>Username</Text>
        <Input
          placeholder='Enter your username'
          style={styles.input}
        />
        <Text style={styles.fontLabel}>Email</Text>
        <Input
          placeholder='Enter your email'
          style={styles.input}
        />
        <Text style={styles.fontLabel}>Password</Text>
        <Input
          placeholder='Enter your password'
          secureTextEntry={true}
          style={styles.input}
        />
        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.googleButton} onPress={() => console.log("Sign up with Google")}>
          <AntDesign name="google" size={24} color="white" />
          <Text style={styles.buttonText}>Sign Up with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createAccount} onPress= {() => props.navigation.navigate('Login')}>
        <Text style={styles.createAccountText}>Create one if you don't have an account</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
    marginTop : -20,
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
  signUpButton: {
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
