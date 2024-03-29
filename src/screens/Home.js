import React from 'react';
import {Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import SCREENS_LIST from '../screenList';

const Home = ({navigation}) => {
  const renderItem = ({item}) => (
    <Pressable
      style={styles.item}
      onPress={() => navigation.navigate(item.screenRoute)}>
      <Text>{item.name}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <FlatList
        data={SCREENS_LIST}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={item => item.name}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};
export default Home;

const ItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  list: {
    paddingVertical: 16,
  },
  separator: {
    height: 16,
  },
  item: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 1,
  },
});
