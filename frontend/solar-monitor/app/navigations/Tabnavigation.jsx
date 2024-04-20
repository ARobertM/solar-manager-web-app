import { View, Text, Animated } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/Home';
import Notification from '../screen/Notification';
import Dashboard from '../screen/Dashboard';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../assets/Colors';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfilePage from '../screen/ProfilePage';
import { AntDesign } from '@expo/vector-icons';
import TabBarIcon from '../components/Animations';


const Tab = createBottomTabNavigator();

export default function Tabnavigation() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: 60,
        bottom: 26,
        position: 'absolute',
        borderRadius: 40,
        left: 36,
        right: 36
      }
    }}>

      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarLabel: 'Notification',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="notifications" library={Ionicons} focused={focused} />
          ),
        }}
      />
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="home" library={FontAwesome5} focused={focused} />
          ),
        }}
      />
      <Tab.Screen name="Dashboard" component={Dashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="monitor-dashboard" library={MaterialCommunityIcons} focused={focused} />
          ),
        }}
      />
      <Tab.Screen name="ProfilePage" component={ProfilePage}
        options={{
          tabBarLabel: 'Profile',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="profile" library={AntDesign} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}