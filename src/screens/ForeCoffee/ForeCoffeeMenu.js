import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import {useAnimatedRef} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const colorTheme = {
  primary: '#1d5027',
  bg_secondary: '#fafafa',
  bg_primary: '#ffffff',
  grey: '#b2b2b2',
  lightgrey: '#f5f5f5',
};

const colors20 = [];
const colors5 = [];
const foodCategories = [
  {
    name: '1 Lorem',
    items: 3,
  },
  {
    name: '2 Lorem',
    items: 2,
  },
  {
    name: '3 Lorem',
    items: 5,
  },
  {
    name: '4 Lorem',
    items: 6,
  },
  {
    name: '5 Lorem',
    items: 3,
  },
  {
    name: '6 Lorem',
    items: 7,
  },
  {
    name: '7 Lorem',
    items: 4,
  },
  {
    name: '8 Lorem',
    items: 1,
  },
  {
    name: '9 Lorem',
    items: 6,
  },
  {
    name: '10 Lorem',
    items: 5,
  },
];
for (let i = 0; i < 10; i++) {
  colors20.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
}

for (let i = 0; i < 5; i++) {
  colors5.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
}

const data = Object.keys(foodCategories).map(i => ({
  id: i,
  name: foodCategories[i].name,
  items: foodCategories[i].items,
  ref: React.createRef(),
}));

const ForeCoffeeMenu = () => {
  const [scrollItemMeasures, setScrollItemMeasures] = React.useState([]);
  const [activeMenu, setActiveMenu] = React.useState(0);
  const rightScrollRef = useAnimatedRef();
  const sideBarRef = React.useRef();

  React.useEffect(() => {
    const m = [];
    data.forEach(food => {
      food.ref.current.measureLayout(
        rightScrollRef.current,
        (x, y, width, height) => {
          m.push({y, height});
          if (m.length === data.length) {
            setScrollItemMeasures(m);
          }
        },
      );
    });
  }, []);

  const scrollToHandler = i => {
    rightScrollRef.current.scrollTo({
      y: scrollItemMeasures[i].y,
      animated: true,
    });
    setActiveMenu(i);
    if (i * 65 - 45 / 2 > height / 4) {
      sideBarRef?.current?.scrollToOffset({
        offset: i * 65 - height / 4 + 115 / 2,
        animated: true,
      });
    } else {
      sideBarRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView
      edges={['bottom']}
      style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row', flex: 1}}>
        <SideBar
          ref={sideBarRef}
          active={activeMenu}
          onPress={i => scrollToHandler(i)}
        />
        <View style={{flex: 1, backgroundColor: colorTheme.bg_primary}}>
          <Header />
          <ScrollView
            ref={rightScrollRef}
            contentContainerStyle={{padding: 20}}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            scrollEventThrottle={16}
            onScroll={ev => {
              // console.log(
              //   'set active ==> ',
              //   Math.floor(ev.nativeEvent.contentOffset.y / height),
              // );
              // scrollToHandler(
              //   Math.floor(ev.nativeEvent.contentOffset.y / height),
              // );
            }}>
            <ImageScroll />
            <FoodCategory data={data} />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForeCoffeeMenu;

const FoodCategory = ({data}) => {
  return (
    <>
      {data.map((food, i) => (
        <View key={i} ref={food.ref} style={{marginTop: 24}}>
          <Text
            style={{
              fontWeight: 'bold',
              color: colorTheme.primary,
              fontSize: 20,
              marginBottom: 8,
            }}>
            {food.name}
          </Text>
          <FoodGrid items={food.items} />
        </View>
      ))}
    </>
  );
};

const FoodGrid = ({items}) => {
  const right = [];
  const left = [];

  for (let index = 0; index < items; index++) {
    if (index % 2 === 0) {
      right.push(<FoodItem key={index} />);
    } else {
      left.push(<FoodItem key={index} />);
    }
  }

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 1}}>{right}</View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>{left}</View>
    </View>
  );
};

const FoodItem = () => {
  return (
    <View style={{width: 130, marginVertical: 8}}>
      <View
        style={{
          aspectRatio: 1 / 1,
          backgroundColor: colorTheme.grey,
          borderRadius: 16,
        }}
      />
      <View style={{paddingHorizontal: 8}}>
        <Text
          style={{
            color: colorTheme.primary,
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 8,
          }}>
          Lorem ipsum asd asd
        </Text>
        <Text
          style={{
            color: colorTheme.primary,
            fontSize: 15,
            marginTop: 8,
          }}>
          Rp. 10.000
        </Text>
      </View>
    </View>
  );
};

const Home = () => {
  return (
    <View
      style={{
        paddingVertical: 20,
        paddingHorizontal: 24,
        backgroundColor: colorTheme.primary,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
      }}>
      <View style={{alignItems: 'center'}}>
        <Icon name="home" size={22} color="white" />
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 11,
            marginTop: 4,
          }}>
          Home
        </Text>
      </View>
    </View>
  );
};

const MenuItem = ({insideColor, text, onPress, active}) => {
  return (
    <Pressable
      style={{alignItems: 'center', width: 50, marginVertical: 10}}
      onPress={onPress}>
      <View
        style={{
          width: 45,
          height: 45,
          backgroundColor: colorTheme.bg_primary,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 2,
          borderWidth: active + 1 === text ? 3 : 0,
          borderColor: colorTheme.primary,
        }}>
        <View
          style={{
            backgroundColor: insideColor,
            width: 20,
            height: 20,
            borderRadius: 6,
          }}
        />
      </View>
      <Text
        style={{
          fontWeight: 'bold',
          color: colorTheme.primary,
          fontSize: 11,
          marginTop: 8,
          textAlign: 'center',
        }}>
        {text}
      </Text>
    </Pressable>
  );
};

const Header = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 26,
      }}>
      <Text
        style={{
          color: colorTheme.primary,
          fontSize: 22,
          fontWeight: '500',
        }}>
        Menu
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="search" size={24} color={colorTheme.primary} />
        <View style={{width: 16}} />
        <Icon name="cart" size={24} color={colorTheme.grey} />
      </View>
    </View>
  );
};

const SideBar = React.forwardRef(({onPress, active}, ref) => {
  const renderItem = ({item, index}) => (
    <MenuItem
      insideColor={item}
      text={index + 1}
      active={active}
      onPress={() => onPress(index)}
    />
  );

  return (
    <View>
      <Home />
      <FlatList
        ref={ref}
        style={{backgroundColor: colorTheme.bg_secondary}}
        contentContainerStyle={{paddingVertical: 25, alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        data={colors20}
        renderItem={renderItem}
        keyExtractor={(_, index) => index}
      />
    </View>
  );
});

const ImageScroll = () => {
  const [measures, setMeasures] = React.useState([]);
  const rowContainer = React.useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const imageSize = width * 0.698;
  const indicators = Object.keys(colors5).map(i => ({
    ref: React.createRef(),
  }));

  React.useEffect(() => {
    const m = [];
    indicators.forEach(color => {
      color.ref?.current?.measureLayout(
        rowContainer.current,
        (x, y, width, height) => {
          m.push({x, width});
          if (m.length === indicators.length) {
            setMeasures(m);
          }
        },
      );
    });
  }, []);

  const renderItem = ({item}) => (
    <View
      style={{
        width: imageSize,
        backgroundColor: item,
        aspectRatio: 1 / 1,
        borderRadius: 16,
      }}
    />
  );

  return (
    <View>
      <View
        style={{
          aspectRatio: 1 / 1,
        }}>
        <Animated.FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{flex: 1}}
          pagingEnabled
          decelerationRate="fast"
          data={colors5}
          renderItem={renderItem}
          keyExtractor={(_, index) => index}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
        />
      </View>
      <View
        ref={rowContainer}
        style={{flexDirection: 'row', alignItems: 'center', marginTop: 12}}>
        {indicators.map((color, i) => (
          <View
            ref={color.ref}
            key={i}
            style={{
              height: 4,
              backgroundColor: colorTheme.lightgrey,
              borderRadius: 50,
              flex: 1,
              marginHorizontal: 2,
            }}
          />
        ))}
        {measures.length === indicators.length ? (
          <ImageIndicator
            measures={measures}
            scrollX={scrollX}
            imageSize={imageSize}
          />
        ) : null}
      </View>
    </View>
  );
};

const ImageIndicator = ({measures, scrollX, imageSize}) => {
  const translateX = scrollX.interpolate({
    inputRange: measures.map((_, i) => i * imageSize),
    outputRange: measures.map(measure => measure.x),
    extrapolate: 'clamp',
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        height: 4,
        backgroundColor: colorTheme.primary,
        borderRadius: 50,
        width: measures[0].width,
        left: 0,
        transform: [{translateX}],
      }}
    />
  );
};
