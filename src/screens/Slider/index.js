import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BalloonSlider from './components/BalloonSlider';
import SimpleSlider from './components/SimpleSlider';

const AnimateButton = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.spacer} />
      <SimpleSlider />
      <View style={styles.spacer} />
      <View style={styles.spacer} />
      <View style={styles.spacer} />
      <View style={styles.spacer} />
      <View style={styles.spacer} />
      <BalloonSlider/>
      <View style={styles.spacer} />
    </ScrollView>
  );
};

export default AnimateButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  spacer: {
    height: 16,
  },
});
