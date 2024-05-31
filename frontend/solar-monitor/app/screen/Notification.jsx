import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import registerNNPushToken from 'native-notify';
import Colors from '../../assets/Colors';

const App = () => {
  const [notifications, setNotifications] = useState([]);
  registerNNPushToken(21585, 'DG5QuGxf7EJltyy0HjAyxT');

  useEffect(() => {
    // Register for Native Notify push notifications
    

    // Set up WebSocket connection
    const ws = new WebSocket('wss://awfully-correct-doe.ngrok-free.app');

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('WebSocket message received:', data);

      const notification = {
        status: data.status,
        checkName: data.labels.checkName,
        severity: data.labels.severity,
        summary: data.annotations.summary,
        description: data.annotations.description,
        generatorURL: data.generatorURL,
        startsAt: data.startsAt,
      };

      setNotifications((prev) => [...prev, notification]);
    };

    ws.onerror = (error) => {
      console.log('WebSocket error:', error);
    };

    ws.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    return () => {
      ws.close();
    };
  }, []);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.welcomeText}>Solis</Text>
      <Text style={styles.solisText}>Notifications</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.notification}>
      <Text style={styles.checkName}>
        <Text style={{ fontWeight: 'bold' }}>{item.checkName}</Text> ({item.status})
      </Text>
      <Text>{item.summary}</Text>
      <Text>{item.description}</Text>
      <Text>Time: {new Date(item.startsAt).toLocaleString()}</Text>
      <Text>Generator URL: {item.generatorURL}</Text>
      <Text>Severity: {item.severity}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[Colors.YELLOW_LIGHT, Colors.WHITE, Colors.WHITE]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.background}
      />
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    paddingBottom: 20,
  },
  headerContainer: {
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
  notification: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 20,
  },
  checkName: {
    fontSize: 24,
    fontFamily : 'pop=regular',
    color : Colors.BLUE,
  },
});

export default App;
