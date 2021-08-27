import React from 'react';
import {StyleSheet, View} from 'react-native';
import SlidetoCompare from './components/SlidetoCompare';

const CompareImage = () => {
  return (
    <View style={styles.container}>
      <SlidetoCompare
        firstImage={
          'https://images.pexels.com/photos/397857/pexels-photo-397857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        }
        secondImage={
          'https://images.pexels.com/photos/7449035/pexels-photo-7449035.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        }
      />
    </View>
  );
};

export default CompareImage;

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center', flex: 1},
});
