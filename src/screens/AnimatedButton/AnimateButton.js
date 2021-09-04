import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import DownloadButton from './components/DownloadButton';
import RoundDownload from './components/RoundDownloadButton';
import SquareUploadButton from './components/SquareUploadButton';

const AnimateButton = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DownloadButton />
      <View style={styles.spacer} />
      <RoundDownload />
      <View style={styles.spacer} />
      <SquareUploadButton />
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
    height: 60,
  },
});
