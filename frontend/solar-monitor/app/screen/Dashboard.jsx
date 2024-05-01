import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "../../assets/Colors";
import axios from 'axios';
import { Feather, MaterialIcons } from '@expo/vector-icons';

export default function Dashboard({ userId }) {
  const [batteryData, setBatteryData] = useState(null);
  const [solarData, setSolarData] = useState(null);
  const [inverterData, setInverterData] = useState(null);

  useEffect(() => {
    const verifyInverter = async () => {
      try {
        const res = await axios.get(`http://192.168.1.5:9000/api/inverter-data?userId=${userId}`);
        if (res.data.length > 0) {
          console.log('Inverter found, fetching real-time data...');
          setInverterData(res.data);
          fetchData(); 
        } else {
          console.log('No inverter found for this user.');
        }
      } catch (error) {
        console.error("Verification failed:", error.response ? error.response.data : error.message);
      }
    };

    const fetchData = async () => {
      try {
        const [batteryRes, solarRes] = await Promise.all([
          axios.get('http://192.168.1.5:9000/api/influxdata-bat-last'),
          axios.get('http://192.168.1.5:9000/api/influxdata-solp-last')
        ]);
        setBatteryData(batteryRes.data);
        setSolarData(solarRes.data);
      } catch (error) {
        console.error("Error fetching real-time data:", error);
      }
    };

    verifyInverter();

    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [userId]);

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
              {batteryData ? `Battery Voltage: ${batteryData._value} V` : "Loading battery data..."}
            </Text>
          </View>
          <View style={styles.iconWithText}>
            <MaterialIcons name="solar-power" size={34} color={Colors.YELLOW_LIGHT} />
            <Text style={styles.solarInfo}>
              {solarData ? `Solar Panel Voltage: ${solarData._value} V` : "Loading solar data..."}
            </Text>
          </View>
          {inverterData && (
            <Text style={styles.solarInfo}>
              Inverter: {inverterData[0].InverterName}
            </Text>
          )}
        </View>
        <Text style={styles.solarInfo2}>Battery Statistics</Text>
        {/* <View style={styles.card}>
          <Text>Statistics for the</Text>
          <Text>Week</Text>
        </View> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  batteryInfo: {
    fontFamily: 'pop-semibold',
    fontSize: 18,
    color: Colors.BLUE,
    marginLeft: 10, 
  },
  solarInfo: {
    fontFamily: 'pop-semibold',
    fontSize: 18,
    color: Colors.YELLOW_LIGHT,
    marginLeft: 10, 
  },
  solarInfo2: {
    fontFamily: 'pop-semibold',
    fontSize: 18,
    color: Colors.YELLOW_LIGHT,
    marginTop:20,
    marginLeft: 40, 
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
  card2: {
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
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
