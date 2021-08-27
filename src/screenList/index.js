import AnimateButton from '../screens/AnimatedButton/AnimateButton'
import AnimatedTextInput from '../screens/AnimatedTextInput/AnimatedTextInput'
import CheckButton from '../screens/CheckButton'
import GojekBottomNav from '../screens/GojekBottomNav'
import AnimatedRadioButton from '../screens/RadioButton/AnimatedRadioButton'
import Slider from '../screens/Slider'
import CompareImage from '../screens/SlidetoCompare'
import SwitchButton from '../screens/SwitchButton'

const SCREENS_LIST = [
	{ screen: AnimateButton, screenRoute: 'AnimateButton', name: 'Animated Button' },
	{ screen: AnimatedTextInput, screenRoute: 'AnimatedTextInput', name: 'Animated Text Input' },
	{ screen: AnimatedRadioButton, screenRoute: 'AnimatedRadioButton', name: 'Animated Radio Button' },
	{ screen: SwitchButton, screenRoute: 'SwitchButton', name: 'Animated Switch Button' },
	{ screen: CheckButton, screenRoute: 'CheckButton', name: 'Animated Check Button' },
	{ screen: Slider, screenRoute: 'Slider', name: 'Slider' },
	{ screen: CompareImage, screenRoute: 'CompareImage', name: 'Compare Image' },
	// { screen: GojekBottomNav, screenRoute: 'GojekBottomNav', name: 'Gojek Bottom Navigation' }
]

export default SCREENS_LIST
