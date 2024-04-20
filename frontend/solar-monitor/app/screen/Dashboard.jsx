import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "../../assets/Colors"

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[Colors.YELLOW_LIGHT,Colors.WHITE,Colors.WHITE]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.background}
        />
          {/* Card pentru venituri zilnice */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>DAILY REVENUE</Text>
            <Text style={styles.revenue}>12.380</Text>
            <Text style={styles.date}>21 Sept, 2022, 08:00 PM</Text>
          </View>

          {/* Card pentru panoul solar */}
          <View style={styles.solarPanelCard}>
            <Text style={styles.solarPanelTitle}>Smart Home Solar</Text>
            <Text style={styles.solarPanelSubtitle}>Bucharest, Romania</Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>844</Text>
                <Text style={styles.statLabel}>kWh</Text>
                <Text style={styles.statPeriod}>Today</Text>
              </View>

              <View style={styles.stat}>
                <Text style={styles.statValue}>325</Text>
                <Text style={styles.statLabel}>kWh</Text>
                <Text style={styles.statPeriod}>This Month</Text>
              </View>

              <View style={styles.stat}>
                <Text style={styles.statValue}>442</Text>
                <Text style={styles.statLabel}>mWh</Text>
                <Text style={styles.statPeriod}>Lifetime</Text>
              </View>
            </View>
          </View>

          {/* Imagine pentru panoul solar */}
          <Image 
            style={styles.image}
            source={require('../../assets/solarpaneldash.jpeg')} 
          />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute', // Poziționează gradientul absolut pentru a umple întregul ecran
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  safeArea: {
    marginTop: 30,
    flex: 1,
  },
  scrollView: {
    flex : 1,
  },
  gradient: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    margin: 16,
    marginTop: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
  },
  revenue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  date: {
    fontSize: 16,
    color: 'grey',
  },
  solarPanelCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  solarPanelTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  solarPanelSubtitle: {
    fontSize: 18,
    color: 'grey',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
    color: 'grey',
  },
  statPeriod: {
    fontSize: 16,
  },
  image: {
    height: 200,
    width:350,
    margin: 16,
    borderRadius: 8,
  },
});
