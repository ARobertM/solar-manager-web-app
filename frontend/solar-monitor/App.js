import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import Login from './app/screen/Login';
import { Input } from '@rneui/themed';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SignIn from './app/screen/SignIn';
import Home from './app/screen/Home';
import Tabnavigation from './app/navigations/Tabnavigation';
import AddInverter from './app/screen/AddInverter';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'pop-italic': require('./assets/fonts/Poppins-Italic.ttf'),
    'pop-regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'pop-semibold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  const Stack = createStackNavigator();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='Tabnavigation' component={Tabnavigation} options={{ headerShown: false }} />
        <Stack.Screen name='AddInverter'component={AddInverter}options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
