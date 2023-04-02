import {
  ImageBackground,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const Onboard = ({navigation}) => {
  const isAndroid = Platform.OS === 'android';
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={isAndroid ? true : false}
        backgroundColor={isAndroid && 'transparent'}
      />
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1606787364406-a3cdf06c6d0c?w=1287&q=80',
        }}
        resizeMode="cover"
        style={styles.coverImage}>
        <LinearGradient
          colors={['transparent', 'transparent', 'transparent', '#000', '#000']}
          style={styles.linearGradient}>
          <View style={styles.coverContainer}>
            <View>
              <Text style={[styles.textWhite, styles.xxl]}>
                Cooking Healthy Meals at Home Like a Chef
              </Text>
              <Text
                style={[
                  styles.textWhite,
                  styles.l,
                  styles.marginT16,
                  styles.marginB16,
                  styles.captionText,
                ]}>
                Let's cook healthier meals with low price, fun experience, and
                most importantly like a pro chef
              </Text>
            </View>
            <Pressable
              onPress={() => navigation.navigate('FoodBottomTab')}
              style={styles.button}>
              <Text style={[styles.textWhite, styles.buttonText]}>
                Get Started
              </Text>
            </Pressable>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Onboard;

const styles = StyleSheet.create({
  container: {flex: 1},
  coverImage: {...StyleSheet.absoluteFill, justifyContent: 'flex-end'},
  linearGradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textWhite: {
    color: 'white',
  },
  xxl: {
    fontSize: 48,
  },
  l: {
    fontSize: 16,
  },
  captionText: {
    lineHeight: 26,
  },
  marginT16: {
    marginTop: 16,
  },
  marginB16: {
    marginBottom: 32,
    marginRight: 70,
  },
  coverContainer: {
    height: '50%',
    paddingHorizontal: 20,
    paddingBottom: 32,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4B3448',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
