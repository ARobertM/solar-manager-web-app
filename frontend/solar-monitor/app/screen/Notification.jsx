import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import registerNNPushToken from 'native-notify';

const App = () => {
  registerNNPushToken(21585, 'DG5QuGxf7EJltyy0HjAyxT');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('wss://awfully-correct-doe.ngrok-free.app');

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      console.log('WebSocket message received:', notification);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.notification}>
            <Text style={styles.checkName}><Text style={{fontWeight: 'bold'}}>{item.checkName}</Text> ({item.status})</Text>
            <Text>{item.message}</Text>
            <Text>Time: {new Date(item.time).toLocaleString()}</Text>
            <Text>Tags: {JSON.stringify(item.tags)}</Text>
            <Text>Values: {JSON.stringify(item.values)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notification: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  checkName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
