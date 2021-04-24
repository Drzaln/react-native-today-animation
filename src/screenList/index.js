import AnimateButton from '../screens/AnimatedButton/AnimateButton'
import AnimatedTextInput from '../screens/AnimatedTextInput/AnimatedTextInput'
import AnimatedRadioButton from '../screens/RadioButton/AnimatedRadioButton'
import SwitchButton from '../screens/SwitchButton'

const SCREENS_LIST = [
	{ screen: AnimateButton, screenRoute: 'AnimateButton', name: 'Animated Button' },
	{ screen: AnimatedTextInput, screenRoute: 'AnimatedTextInput', name: 'Animated Text Input' },
	{ screen: AnimatedRadioButton, screenRoute: 'AnimatedRadioButton', name: 'Animated Radio Button' },
	{ screen: SwitchButton, screenRoute: 'SwitchButton', name: 'Animated Switch Button' }
]

export default SCREENS_LIST
