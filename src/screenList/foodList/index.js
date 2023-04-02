import BottomTab from '../../screens/RecipeScreens/BottomTab';
import Onboard from '../../screens/RecipeScreens/Onboard';

const FOOD_SCREENS_LIST = [
  {
    screen: Onboard,
    screenRoute: 'FoodOnboard',
    name: 'FoodOnboard',
  },
  {
    screen: BottomTab,
    screenRoute: 'FoodBottomTab',
    name: 'FoodBottomTab',
  },
];

export default FOOD_SCREENS_LIST;
