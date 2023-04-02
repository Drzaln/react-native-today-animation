import AnalogClockLoading from '../screens/AnalogClockLoading/AnalogClockLoading';
import AnimateButton from '../screens/AnimatedButton/AnimateButton';
import AnimatedTextInput from '../screens/AnimatedTextInput/AnimatedTextInput';
import CheckButton from '../screens/CheckButton/CheckButton';
import Collision from '../screens/Collision/Collision';
import Drag from '../screens/Drag/Drag';
import Onboard from '../screens/RecipeScreens/Onboard';
import ForeCoffeeMenu from '../screens/ForeCoffee/ForeCoffeeMenu';
import IBattery from '../screens/IBattery/IBattery';
import IosIcon from '../screens/IosIcon/IosIcon';
import AnimatedRadioButton from '../screens/RadioButton/AnimatedRadioButton';
import RNGH2 from '../screens/RNGH2/RNGH2';
import ScrollIndicator from '../screens/ScrollIndicator/ScrollIndicator';
import Slider from '../screens/Slider';
import CompareImage from '../screens/SlidetoCompare';
import Stepper from '../screens/Stepper/Stepper';
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
    screen: IBattery,
    screenRoute: 'IBattery',
    name: 'iOS Battery Slider',
  },
  {
    screen: IosIcon,
    screenRoute: 'IosIcon',
    name: 'iOS App Install Animation',
  },
  {
    screen: ScrollIndicator,
    screenRoute: 'ScrollIndicator',
    name: 'Scroll Indicator Animation',
  },
  {
    screen: AnalogClockLoading,
    screenRoute: 'AnalogClockLoading',
    name: 'Analog Clock Loading Animation',
  },
  {
    screen: Stepper,
    screenRoute: 'Stepper',
    name: 'Stepper Animation',
  },
  {
    screen: Drag,
    screenRoute: 'Drag',
    name: 'Drag Animation',
  },
  {
    screen: Onboard,
    screenRoute: 'RecipeApp',
    name: 'Recipe App',
  },
  // {
  //   screen: Collision,
  //   screenRoute: 'Collision',
  //   name: 'Collision Animation',
  // },
  // {
  //   screen: RNGH2,
  //   screenRoute: 'RNGH2',
  //   name: 'RN Gesture Handler 2',
  // },
];

export default SCREENS_LIST;
