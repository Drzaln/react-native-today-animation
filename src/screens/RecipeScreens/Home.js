import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import OcticonsIcons from 'react-native-vector-icons/Octicons';
import popularRecipeList from './data/PopularRecipeList.json';
import dailyAdviceList from './data/DailyAdviceList.json';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OcticonIcons from 'react-native-vector-icons/Octicons';
import {BlurView} from '@react-native-community/blur';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = width * 0.6;

const RECIPE_CATEGORY = ['all', 'salad', 'meat', 'seafood', 'oatmeal'];

const Home = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [popularRecipe, setPopularRecipe] = React.useState([]);
  const date = new Date();
  const hour = date.getHours();

  React.useEffect(() => {
    const recipe = popularRecipeList.filter(item => {
      if (selectedCategory === 'all') {
        return item;
      } else {
        return item.foodCategory === selectedCategory;
      }
    });
    setPopularRecipe(recipe);
  }, [selectedCategory]);

  const greeting = React.useCallback(() => {
    if (hour < 12) {
      return 'Good Morning';
    } else if (hour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }, [hour]);

  return (
    <SafeAreaView edges={['top']} style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {greeting()}, <Text style={styles.nameText}>Dian!</Text>
        </Text>
        <View style={styles.rowCenter}>
          <Pressable style={styles.notification}>
            <OcticonsIcons name="bell-fill" color={'#8e8d8e'} size={20} />
          </Pressable>
          <View style={styles.profileImage}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80',
                height: 44,
                width: 44,
              }}
            />
          </View>
        </View>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}>
        <View style={styles.recipeCard}>
          <View style={styles.recipeCaption}>
            <Text style={styles.recipeTitle}>RECIPE</Text>
            <Text style={styles.recipeText}>Vegetable Salad with Potatos</Text>
            <Pressable style={styles.watchButton}>
              <Text style={styles.watchText}>Watch Video</Text>
            </Pressable>
          </View>
          <Image
            source={{
              uri: 'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/22476/salad-clipart-xl.png',
              height: 115,
              width: 115,
            }}
            resizeMode="contain"
            style={styles.recipeImage}
          />
        </View>
        <Text style={styles.popularRecipe}>Popular Recipes</Text>
        <FlatList
          data={RECIPE_CATEGORY}
          key={item => item}
          horizontal
          renderItem={item => (
            <CategoryItem
              {...item}
              selectedItem={selectedCategory}
              onPress={selected => setSelectedCategory(selected)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainerList}
          style={styles.categoryList}
        />
        <FlatList
          data={popularRecipe}
          key={(_, i) => i.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainerList}
          style={styles.categoryList}
          renderItem={item => <PopularRecipeItem {...item} />}
        />
        <View style={[styles.rowCenter, styles.jBetween, styles.mBottom16]}>
          <Text style={styles.popularRecipe}>Daily Advice</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        {dailyAdviceList.map((item, index) => (
          <DailyAdviceItem key={index} {...item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const DailyAdviceItem = ({name, image, estimate}) => {
  return (
    <View style={styles.dailyAdvice}>
      <View style={styles.imageAdvice}>
        <Image
          source={{uri: image}}
          resizeMode="cover"
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.textAdvice}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.menuInfo}>
          <Text style={styles.textCalories}>Reading - </Text>
          <Text style={styles.minute}>{estimate} Minutes</Text>
        </View>
      </View>
    </View>
  );
};

const CategoryItem = ({item, onPress, selectedItem}) => {
  const isSelected = selectedItem === item;
  return (
    <Pressable
      onPress={() => onPress(item)}
      style={styles.categoryItem(isSelected)}>
      <Text style={styles.categoryText(isSelected)}>{item}</Text>
    </Pressable>
  );
};

const PopularRecipeItem = ({item, onPress}) => {
  return (
    <Pressable onPress={() => onPress(item)} style={styles.popularItem}>
      <ImageBackground
        source={{
          uri: item.foodImage,
        }}
        resizeMode="cover"
        style={styles.popularImage}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="bookmark-minus"
            color={'#c5c5c6'}
            size={32}
          />
        </View>
        <View style={styles.ratingContainer}>
          <View style={[styles.rowCenter, styles.rating]}>
            <BlurView
              style={styles.absolute}
              blurType="light"
              blurAmount={5}
              reducedTransparencyFallbackColor="white"
            />
            <OcticonIcons name="star-fill" color={'#ffc300'} size={22} />
            <Text style={[styles.minute, styles.mLeft8]}>{item.foodStars}</Text>
          </View>
        </View>
      </ImageBackground>
      <Text style={styles.popularText}>{item.foodName}</Text>
      <View style={styles.menuInfo}>
        <Text style={styles.textCalories}>{item.foodCalories} Calories - </Text>
        <Text style={styles.minute}>{item.foodCookTime} Minutes</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: 'white'},
  container: {backgroundColor: '#f5f5f5'},
  content: {
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#8e8d8e',
  },
  nameText: {
    color: '#4b3448',
  },
  notification: {
    borderColor: '#4b3448',
    borderWidth: 1,
    borderRadius: 100,
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  profileImage: {
    borderRadius: 100,
    height: 44,
    width: 44,
    backgroundColor: '#8e8d8e',
    overflow: 'hidden',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeCard: {
    backgroundColor: '#f3eaf4',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  recipeCaption: {
    flex: 1,
  },
  recipeImage: {
    flex: 1,
  },
  recipeTitle: {
    color: '#4b3448',
    fontSize: 22,
    fontWeight: 'bold',
  },
  recipeText: {
    color: '#4b3448',
    fontSize: 18,
    lineHeight: 24,
    marginTop: 2,
  },
  watchButton: {
    backgroundColor: '#f86800',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    width: '75%',
    marginTop: 8,
  },
  watchText: {
    color: 'white',
  },
  popularRecipe: {
    color: '#4b3448',
    marginLeft: 16,
    marginTop: 18,
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryContainerList: {
    paddingHorizontal: 16,
  },
  categoryList: {
    marginTop: 16,
  },

  categoryItem: isSelected => ({
    backgroundColor: isSelected ? '#4b3448' : 'white',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 14,
  }),
  categoryText: isSelected => ({
    color: isSelected ? 'white' : '#4b3448',
    textTransform: 'capitalize',
  }),

  popularItem: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 12,
    marginRight: 14,
    width: ITEM_WIDTH,
  },
  imageContainer: {
    width: '100%',
    backgroundColor: '#f3eaf4',
    marginBottom: 8,
  },
  popularImage: {
    aspectRatio: 1 / 0.9,
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: '#f3eaf4',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  popularText: {
    color: '#4b3448',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  textCalories: {
    color: '#8e8d8e',
  },
  minute: {
    color: '#4b3448',
  },
  iconContainer: {
    alignItems: 'flex-end',
    marginRight: 8,
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    marginBottom: 8,
  },
  rating: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  mLeft8: {
    marginLeft: 8,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  jBetween: {
    justifyContent: 'space-between',
  },
  seeAll: {
    color: '#f86800',
    marginRight: 16,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
  },
  mBottom16: {
    marginBottom: 16,
  },
  dailyAdvice: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 8,
    marginBottom: 14,
    flexDirection: 'row',
    flex: 1,
  },
  imageAdvice: {
    flex: 0.2,
    aspectRatio: 1 / 1.5,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  imageStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  textAdvice: {
    flex: 0.8,
  },
  title: {
    color: '#4b3448',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginTop: 4,
    marginRight: 40,
  },
});
