import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Colors from '../../assets/Colors';

const BatteryVoltageStatsCards = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://awfully-correct-doe.ngrok-free.app/api/influxdata-battery-stats');
        const data = res.data;

        console.log('Data received:', data); // Adăugat pentru debug
        setStats(data);
        setLoading(false);
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
      <Text style={styles.chartTitle}>Battery Voltage Statistics</Text>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View style={styles.statsContainer}>
          <View style={styles.card}>
            <View style={styles.statPair}>
              <View style={[styles.statCard, styles.blueCard]}>
                <Text style={styles.cardTitle}>Max</Text>
                <Text style={styles.cardValue}>{stats.max}</Text>
              </View>
              <View style={[styles.statCard, styles.lightBlueCard]}>
                <Text style={styles.cardTitle}>Min</Text>
                <Text style={styles.cardValue}>{stats.min}</Text>
              </View>
            </View>
            <View style={styles.statPair}>
              <View style={[styles.statCard, styles.yellowCard]}>
                <Text style={styles.cardTitle}>Sum</Text>
                <Text style={styles.cardValue}>{stats.sum}</Text>
              </View>
              <View style={[styles.statCard, styles.lightYellowCard]}>
                <Text style={styles.cardTitle}>Mean</Text>
                <Text style={styles.cardValue}>{stats.mean}</Text>
              </View>
            </View>
            <View style={styles.statPair}>
              <View style={[styles.statCard, styles.blueCard]}>
                <Text style={styles.cardTitle}>StdDev</Text>
                <Text style={styles.cardValue}>{stats.stddev}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default BatteryVoltageStatsCards;

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
    fontSize: 24,
    fontFamily: 'pop-semibold',
    color: Colors.BLUE,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16
  },
  statsContainer: {
    width: '100%',
    padding: 10,
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statPair: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueCard: {
    backgroundColor: '#04a4ff',
  },
  lightBlueCard: {
    backgroundColor: '#04a4ff',
  },
  yellowCard: {
    backgroundColor: '#ffd700',
  },
  lightYellowCard: {
    backgroundColor: '#ffd700',
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'pop-regular',
    color: '#fff',
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
