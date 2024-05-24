import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const image1 = require('../../assets/solarPanelpoza.jpg');
const image2 = require('../../assets/orangeButYellowMore.jpg');
const image3 = require('../../assets/panouriSolareaproape.jpg');

const data = [
  {
    title: "Monitoring Panel Performance",
    description: "Keep track of your solar panels' efficiency in real-time.",
    image: image1,
  },
  {
    title: "Real-Time Energy Output",
    description: "View the current energy output and historical data of your solar panels.",
    image: image2,
  },
  {
    title: "System Health Checks",
    description: "Automatically monitor and receive alerts for system health issues.",
    image: image3,
  },
];

const renderItem = ({ item }) => (
  <ImageBackground source={item.image} style={styles.slide}>
    <View style={styles.textContainer}>
      <Text style={styles.slideTitle}>{item.title}</Text>
      <Text style={styles.slideDescription}>{item.description}</Text>
    </View>
  </ImageBackground>
);

const NewUpdatesCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { width } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Carousel
          data={data}
          renderItem={renderItem}
          width={width * 0.8}
          height={width / 2}
          onSnapToItem={(index) => setActiveSlide(index)}
          customAnimationType="timing"
          customAnimationDuration={600}
          loop
        />
        <View style={styles.paginationContainer}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeSlide ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

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
  carouselContainer: {
    height: 210, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingEnd : 20,
  },
  slideTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'pop-semibold',
  },
  slideDescription: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily : 'pop-semibold',
    marginTop: 5,
    bottom: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 9,
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  activeDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  inactiveDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});

export default NewUpdatesCarousel;
