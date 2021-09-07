import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import ThreeSection from './components/ThreeSection';

const MenuSection = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThreeSection />
      <View style={styles.spacer} />
    </ScrollView>
  );
};

export default MenuSection;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  spacer: {
    height: 60,
  },
});
