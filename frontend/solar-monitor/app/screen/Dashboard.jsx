import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "../../assets/Colors";
import axios from 'axios';


export default function Dashboard() {

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[Colors.YELLOW_LIGHT, Colors.WHITE, Colors.WHITE]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.background}
      />
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Solis</Text>
        <Text style={styles.solisText}>Dashboard</Text>
        <View style={styles.card}>
          
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  card: {
    height: 60,
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
  safeArea: {
    marginTop: 30,
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: {
    padding: 20,
  },
  welcomeText: {
    fontFamily: 'pop-semibold',
    fontSize: 23,
    color: Colors.BLUE
  },
  solisText: {
    fontFamily: 'pop-semibold',
    fontSize: 40,
    marginTop: -20,
    marginLeft: 20,
    color: Colors.YELLOW_LIGHT
  }
});
