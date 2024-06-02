import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground, Alert, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import Colors from '../../assets/Colors';

const { width: viewportWidth } = Dimensions.get('window');

const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHERAPIKEY;

const weatherImages = {
    Clouds: require('../../assets/inorat.png'),
    Rain: require('../../assets/ploua.png'),
    Clear: require('../../assets/soarepanou.jpeg'),
};

const WeatherForecast = ({ latitude, longitude }) => {
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (latitude && longitude) {
            fetchWeatherData(latitude, longitude);
        }
    }, [latitude, longitude]);

    const fetchWeatherData = async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );
            setForecastData(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const renderForecastItem = ({ item }) => {
        const weatherCondition = item.weather[0].main;
        const backgroundImage = weatherImages[weatherCondition] || weatherImages['Clear'];

        return (
            <View style={styles.forecastContainer}>
                <ImageBackground source={backgroundImage} style={styles.imageBackground}>
                    <LinearGradient
                        colors={['rgba(255, 255, 255, 0.7)', 'transparent']}
                        style={styles.gradient}
                    />
                    <View style={styles.forecastItem}>
                        <Text style={styles.date}>{new Date(item.dt_txt).toLocaleDateString()}</Text>
                        <Text style={styles.description}>{item.weather[0].description}</Text>
                        <Text style={styles.temp}>{item.main.temp}°C</Text>
                    </View>
                </ImageBackground>
            </View>
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>5-Day Weather Forecast</Text>
            <Carousel
                data={forecastData.list.filter(item => new Date(item.dt_txt).getHours() === 12)}
                renderItem={renderForecastItem}
                sliderWidth={viewportWidth - 60}
                itemWidth={viewportWidth * 0.65}
                keyExtractor={item => item.dt_txt}
                containerCustomStyle={styles.carouselContainer}
                contentContainerCustomStyle={styles.carouselContentContainer}
            />
        </View>
    );
};

const WeatherApp = () => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Location permission is needed to show weather updates.');
                setLoading(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
            setLoading(false);
        })();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={appStyles.container}>
            {location ? (
                <WeatherForecast latitude={location.latitude} longitude={location.longitude} />
            ) : (
                <Text>Location not available</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        marginHorizontal: 20,
    },
    header: {
        fontSize: 24,
        fontFamily: 'pop-semibold',
        marginBottom: 10,
        color: Colors.YELLOW_LIGHT,
    },
    carouselContainer: {
        marginTop: 10,
    },
    carouselContentContainer: {
        alignItems: 'center',
    },
    forecastContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        width: '100%',
        marginHorizontal: 5,
        fontFamily: 'pop-regular'
    },
    imageBackground: {
        width: '100%',
        height: 160,
        justifyContent: 'flex-end',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    forecastItem: {
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    description: {
        fontSize: 14,
        color: '#fff',
    },
    temp: {
        fontFamily: 'pop-semibold',
        fontSize: 26,
        color: '#fff',
    },
});

const appStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginTop: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default WeatherApp;
