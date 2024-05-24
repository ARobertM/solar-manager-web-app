import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;

const BatteryVoltageChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://192.168.1.3:9000/api/influxdata-bat');
        const data = res.data;
        const chartData = {
          labels: data.map(entry => entry._time),
          datasets: [{
            data: data.map(entry => entry._value),
          }],
        };
        setChartData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text style={{ textAlign: 'center', marginTop: 20 }}>Battery Voltage Over the Past 7 Days</Text>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
      />
    </View>
  );
};

export default BatteryVoltageChart;
