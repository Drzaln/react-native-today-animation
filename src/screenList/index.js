import AnimateButton from '../screens/AnimatedButton/AnimateButton';
import AnimatedTextInput from '../screens/AnimatedTextInput/AnimatedTextInput';
import CheckButton from '../screens/CheckButton/CheckButton';
import ForeCoffeeMenu from '../screens/ForeCoffee/ForeCoffeeMenu';
import AnimatedRadioButton from '../screens/RadioButton/AnimatedRadioButton';
import RNGH2 from '../screens/RNGH2/RNGH2';
import Slider from '../screens/Slider';
import CompareImage from '../screens/SlidetoCompare';
import SwitchButton from '../screens/SwitchButton/SwitchButton';

const SCREENS_LIST = [
  {
    screen: AnimateButton,
    screenRoute: 'AnimateButton',
    name: 'Animated Button',
  },
  {
    screen: AnimatedTextInput,
    screenRoute: 'AnimatedTextInput',
    name: 'Animated Text Input',
  },
  {
    screen: AnimatedRadioButton,
    screenRoute: 'AnimatedRadioButton',
    name: 'Animated Radio Button',
  },
  {
    screen: SwitchButton,
    screenRoute: 'SwitchButton',
    name: 'Animated Switch Button',
  },
  {
    screen: CheckButton,
    screenRoute: 'CheckButton',
    name: 'Animated Check Button',
  },
  {screen: Slider, screenRoute: 'Slider', name: 'Slider'},
  {screen: CompareImage, screenRoute: 'CompareImage', name: 'Compare Image'},
  {
    screen: ForeCoffeeMenu,
    screenRoute: 'ForeCoffeeMenu',
    name: 'Fore Coffee Menu',
  },
  {
    screen: RNGH2,
    screenRoute: 'RNGH2',
    name: 'RN Gesture Handler 2',
  },
];

export default SCREENS_LIST;
