import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ExpandedSearch from './components/ExpandedSearch';
import SearchInput from './components/SearchInput';

const AnimatedTextInput = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <SearchInput />
      <View style={styles.spacer} />
      <ExpandedSearch />
    </ScrollView>
  );
};

export default AnimatedTextInput;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  spacer: {
    height: 60,
  },
});
