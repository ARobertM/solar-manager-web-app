import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Colors from '../../assets/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import AddInverterBtn from '../components/AddInverterBtn';
import NewUpdatesCarousel from '../components/NewUpdatesCarousel';
import WeatherApp from '../components/WeatherApp';


export default function Home({ userId }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[Colors.YELLOW_LIGHT, Colors.WHITE, Colors.WHITE]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.background}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Welcome to,</Text>
          <Text style={styles.solisText}>Solis</Text>
          <Text style={styles.descriptionText}></Text>

          <AddInverterBtn userId={userId} />
          <NewUpdatesCarousel/>
          <WeatherApp/>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  addInverter:{
    paddingLeft : 20,
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
  scrollView: {

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
