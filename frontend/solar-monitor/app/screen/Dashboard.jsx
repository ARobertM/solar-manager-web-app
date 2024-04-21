import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "../../assets/Colors";
import axios from 'axios';
import { FlatList } from 'react-native';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area
} from "recharts";

const token = "BBMbATxhDMYAg4d2CqHzCvrVtNzkNmo1UPYx9eiao59CekljGijbCYqIeIBeAM3DA-gT63XiI86ngHQTNzYZIQ==";
const org = "SolarManagerApp";
const influxDBUrl = "http://192.168.0.103:8086";
const query = `
  from(bucket: "solar-data")
    |> range(start: -7d)
    |> filter(fn: (r) => r._measurement == "energy_data" and (r._field == "batteryVoltage" or r._field == "solarPanelVoltage"))
    |> last()
`;

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(`${influxDBUrl}/api/v2/query?org=${org}`, { query }, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setData(response.data?.results?.[0]?.series?.[0]?.values || []);
    } catch (error) {
      console.error(error);
    }
  };

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
          <Text>Data from InfluxDB:</Text>
          {data.length > 0 ? (
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text>
                    Time: {item[0]}, Value: {item[1]}
                  </Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text> No data available</Text>
          )}
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
