import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../assets/Colors';
import { useNavigation } from '@react-navigation/native';

export default function AddInverterBtn({ userId }) {
  const navigation = useNavigation();

  const handleAddPress = () => {
    console.log("id:",userId)
    navigation.navigate('AddInverter', { userId: userId });
  };

  return (
    <TouchableOpacity onPress={handleAddPress} style={styles.button}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="qrcode-scan" size={60} color={Colors.BLUE} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Add a new Inverter!</Text>
        <Text style={styles.subtitle}>Scan the QR code to add a new device!</Text>
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  iconContainer:{
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 10,
  },    
  button: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingRight: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  textContainer: {
    flex : 1,
    justifyContent: 'center',
    alignContent : 'flex-end',
  },
  title: {
    color: Colors.BLUE,
    fontSize: 23,
    fontFamily: 'pop-semibold',
  },
  subtitle: {
    color: 'gray',
    fontSize: 18,
    fontFamily: 'pop-italic'
  },
});