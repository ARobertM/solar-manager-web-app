import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "../../assets/Colors";
import axios from 'axios';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import SolarVoltageChart from '../components/SolarDataChart';
import BatteryVoltageChart from '../components/BatteryDataChart';
import BatteryVoltageStatsPieChart from '../components/BatteryVoltageStatsPieChart';

export default function Dashboard({ userId }) {
  const apiUrl = process.env.EXPO_PUBLIC_IPV4 ;
  const screenWidth = Dimensions.get("window").width;

  const [batteryData, setBatteryData] = useState(null);
  const [solarData, setSolarData] = useState(null);
  const [inverterData, setInverterData] = useState(null);
  const [batteryPercentage, setBatteryPercentage] = useState(null);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      data: [],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 2
    }]
  });

  useEffect(() => {
    const verifyAndFetchData = async () => {
      try {
        // console.log('Sending request with userId:', userId);
        const res = await axios.get(`https://awfully-correct-doe.ngrok-free.app/api/inverter-data/${userId}`);
        // console.log('Inverter data response:', res.data);
        if (res.data && res.data.inverterData) {
          // console.log('Inverter found, fetching real-time data...');
          setInverterData(res.data.inverterData);
          await fetchData(res.data.inverterData);
          await fetchBatteryData(res.data.inverterData);
        } else {
          console.log('No inverter found for this user.');
          setInverterData(null);
        }
      } catch (error) {
        console.error("Verification failed:", error.response ? error.response.data : error.message);
        setInverterData(null);
      }
    };

    const fetchData = async (inverterData) => {
      if (!inverterData) {
        // console.log("No inverter data to fetch");
        return;
      }
      try {
        const [batteryRes, solarRes, batPercRes] = await Promise.all([
          axios.get(`https://awfully-correct-doe.ngrok-free.app/api/influxdata-bat-last`).catch(error => {
            console.error("Error fetching battery data:", error);
            return { data: null };
          }),
          axios.get(`https://awfully-correct-doe.ngrok-free.app/api/influxdata-solp-last`).catch(error => {
            console.error("Error fetching solar data:", error);
            return { data: null };
          }),
          axios.get(`https://awfully-correct-doe.ngrok-free.app/api/influxdata-batperc-last`).catch(error => {
            console.error("Error fetching battery percentage data:", error);
            return { data: null };
          }),
        ]);
        // console.log('Battery data response:', batteryRes.data);
        // console.log('Solar data response:', solarRes.data);
        // console.log('Battery percentage response:', batPercRes.data);

        if (batteryRes.data) {
          setBatteryData(batteryRes.data);
        } else {
          console.log('Battery data is null');
        }

        if (solarRes.data) {
          setSolarData(solarRes.data);
        } else {
          console.log('Solar data is null');
        }

        if (batPercRes.data) {
          setBatteryPercentage(batPercRes.data);
        } else {
          console.log('Battery percentage data is null');
        }

      } catch (error) {
        console.error("Error fetching real-time data:", error);
        setBatteryData(null);
        setSolarData(null);
        setBatteryPercentage(null);
      }
    };

    const fetchBatteryData = async (inverterData) => {
      if (!inverterData) {
        // console.log("No inverter data to fetch battery data");
        return;
      }
      try {
        const batteryDataRes = await axios.get(`https://awfully-correct-doe.ngrok-free.app/api/influxdata-bat`);
        const batteryData = batteryDataRes.data;
        // console.log('Historical battery data response:', batteryData);
        
        if (batteryData && Array.isArray(batteryData)) {
          const labels = batteryData.map(item => new Date(item._time).toLocaleDateString());
          const data = batteryData.map(item => item._value);
          setChartData({
            labels,
            datasets: [{
              data,
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              strokeWidth: 2
            }]
          });
        } else {
          // console.log('Historical battery data is null or not an array');
        }

      } catch (error) {
        // console.error("Error fetching historical battery data:", error);
      }
    };

    verifyAndFetchData();

    const interval = setInterval(verifyAndFetchData, 10000);
    return () => clearInterval(interval);
  }, [userId, apiUrl]); 

  useEffect(() => {
    // console.log('Battery Data:', batteryData);
    // console.log('Solar Data:', solarData);
    // console.log('Battery Percentage:', batteryPercentage);
    // console.log('Inverter Data:', inverterData);
    // console.log('Chart Data:', chartData);
  }, [batteryData, solarData, batteryPercentage, inverterData, chartData]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[Colors.YELLOW_LIGHT, Colors.WHITE, Colors.WHITE]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.background}
      />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Solis</Text>
          <Text style={styles.solisText}>Dashboard</Text>
          {inverterData ? (
            <>
              <View style={styles.card}>
                <View style={styles.iconWithText}>
                  <Feather name="battery-charging" size={34} color={Colors.BLUE} />
                  <Text style={styles.batteryInfo}>
                    {batteryData ? `  Battery Voltage: ${batteryData._value} V` : "  Loading battery data..."}
                  </Text>
                </View>
                <View style={styles.iconWithText}>
                  <MaterialIcons name="solar-power" size={34} color={Colors.YELLOW_LIGHT} />
                  <Text style={styles.solarInfo}>
                    {solarData ? `  Solar Panel Voltage: ${solarData._value} V` : "  Loading solar data..."}
                  </Text>
                </View>
              </View>
              <View style={styles.textSimple}>
                <Text style={styles.solarInfo}>Inverter: {inverterData.InverterName}</Text>
              </View>

              <Text style={styles.batteryInfo2}>Battery Statistics</Text>
              <View style={styles.batteryContainer}>
                <FontAwesome name="battery-4" size={60} color={Colors.BLUE} style={styles.batteryIcon} />
                <Text style={styles.batteryText}>
                  {batteryPercentage ? `${batteryPercentage._value} %` : "Loading battery percentage..."}
                </Text>
              </View>
              <BatteryVoltageStatsPieChart/>
              <SolarVoltageChart/>
              <BatteryVoltageChart/>
            </>
          ) : (
            <Text style={styles.noInverterText}>No inverter data available. Please add an inverter.</Text>
          )}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 30,
  },
  batteryIcon: {
    marginRight: 10,
  },
  batteryText: {
    fontFamily: 'pop-semibold',
    fontSize: 28,
    color: Colors.BLUE,
  },
  textSimple: {
    marginLeft: 30,
    marginTop: 10,
  },
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
  batteryInfo2: {
    fontFamily: 'pop-semibold',
    fontSize: 28,
    color: Colors.BLUE,
    marginLeft: 30,
    marginTop: 10,
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
    marginTop: 20,
    marginLeft: 40,
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
    fontFamily: 'pop-regular',
    justifyContent: 'flex-end',
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
    color: Colors.BLUE,
  },
  solisText: {
    fontFamily: 'pop-semibold',
    fontSize: 40,
    marginTop: -20,
    marginLeft: 20,
    color: Colors.YELLOW_LIGHT,
  },
  noInverterText: {
    fontFamily: 'pop-regular',
    fontSize: 18,
    color: Colors.RED,
    textAlign: 'center',
    marginTop: 20,
  },
  loadingText: {
    fontFamily: 'pop-regular',
    fontSize: 18,
    color: Colors.GRAY,
    textAlign: 'center',
    marginTop: 20,
  },
});

