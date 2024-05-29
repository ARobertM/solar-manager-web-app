import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import Colors from '../../assets/Colors';

const screenWidth = Dimensions.get('window').width;

const SolarVoltageChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      data: [],
      color: (opacity = 1) => `rgba(255, 204, 0, ${opacity})`,
      strokeWidth: 2
    }]
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://awfully-correct-doe.ngrok-free.app/api/influxdata-solp');
        const data = res.data;

        console.log('Data received:', data); 

        if (data && Array.isArray(data) && data.length > 0) {
          const labels = data.map(entry => new Date(entry._time).toLocaleTimeString());
          const chartValues = data.map(entry => entry._value);

          console.log('Chart labels:', labels); 
          console.log('Chart values:', chartValues); 

          setChartData({
            labels,
            datasets: [{
              data: chartValues,
              color: (opacity = 1) => `rgba(255, 204, 0, ${opacity})`,
              strokeWidth: 2
            }]
          });
          setLoading(false);
        } else {
          setError("No valid data received from server");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data from server");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.chartTitle}>Solar Panel Voltage for the Last 24 Hours</Text>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View>
          <BarChart
            data={chartData}
            width={screenWidth - 40}
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 204, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              barPercentage: 0.5,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
              marginHorizontal: 20
            }}
          />
          <LineChart
            data={chartData}
            width={screenWidth - 40}
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              fontFamily: 'pop-regular',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 204, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              marginHorizontal: 20
            }}
          />
        </View>
      )}
    </View>
  );
};

export default SolarVoltageChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chartTitle: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 28,
    fontFamily : 'pop-semibold',
    color: Colors.YELLOW_LIGHT,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16
  }
});
