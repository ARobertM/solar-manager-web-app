import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Colors from '../../assets/Colors'; 

const TabBarIcon = ({ name, library: IconLibrary, focused }) => {
    // Acesta va controla factorul de scalare, nu dimensiunea directă a iconiței.
    const scaleAnim = useRef(new Animated.Value(focused ? 1.1 : 1)).current; 
    const color = focused ? Colors.BLUE : Colors.YELLOW_LIGHT;

    useEffect(() => {
      Animated.spring(scaleAnim, {
        toValue: focused ? 1.3 : 1, 
        useNativeDriver: true,
        bounciness: 20,
        speed: 0.1,
      }).start();
    }, [focused, scaleAnim]);
  
    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <IconLibrary name={name} size={24} color={color} />
      </Animated.View>
    );
  };

export default TabBarIcon;
