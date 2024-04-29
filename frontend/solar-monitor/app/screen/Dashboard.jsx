import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "../../assets/Colors";
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function Dashboard() {
  const [batteryData, setBatteryData] = useState(null);
  const [solarData, setSolarData] = useState(null);

  useEffect(() => {
    const fetchBatteryData = async () => {
      try {
        const responseBat = await axios.get('http://192.168.1.5:9000/api/influxdata-bat-last');
        setBatteryData(responseBat.data);
      } catch (error) {
        console.error("Error fetching battery data:", error);
        setBatteryData({ error: 'Failed to retrieve battery data' });
      }
    };

    const fetchSolarData = async () => {
      try {
        const response = await axios.get('http://192.168.1.5:9000/api/influxdata-solp-last');
        setSolarData(response.data);
      } catch (error) {
        console.error("Error fetching solar data:", error);
        setSolarData({ error: 'Failed to retrieve solar data' });
      }
    };

    fetchBatteryData();
    fetchSolarData();
    const batteryInterval = setInterval(fetchBatteryData, 10000);
    const solarInterval = setInterval(fetchSolarData, 10000);

    return () => {
      clearInterval(batteryInterval);
      clearInterval(solarInterval);
    };
  }, []);

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
          <View style={styles.iconWithText}>
            <Feather name="battery-charging" size={34} color={Colors.BLUE} />
            <Text style={styles.batteryInfo}>
              {batteryData ? ` Battery Voltage: ${batteryData._value} V` : "Loading battery data..."}
            </Text>
          </View>
          <View style={styles.iconWithText}>
            <MaterialIcons name="solar-power" size={34} color={Colors.YELLOW_LIGHT} />
            <Text style={styles.solarInfo}>
              {solarData ? ` Solar Panel Voltage: ${solarData._value} V` : "Loading solar data..."}
            </Text>
          </View>
        </View>
        <View style={styles.card}>
            
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconWithText: {
    flexDirection: 'row', // Align icon and text in a row
    alignItems: 'center', // Center them vertically
    marginBottom: 10, // Optional: add space between the rows
  },
  batteryInfo: {
    fontFamily: 'pop-semibold',
    fontSize: 18,
    color: Colors.BLUE,
    marginLeft: 10, // Add some space between icon and text
  },
  solarInfo: {
    fontFamily: 'pop-semibold',
    fontSize: 18,
    color: Colors.YELLOW_LIGHT,
    marginLeft: 10, // Add some space between icon and text
  },
  batteryInfo: {
    fontFamily: 'pop-semibold',
    fontSize: 23,
    color: Colors.BLUE
  },
  solarInfo: {
    fontFamily: 'pop-semibold',
    fontSize: 23,
    color: Colors.YELLOW_LIGHT
  },
  card: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'column',
    fontFamily: 'pop-regular'
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
