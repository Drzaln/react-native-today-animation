import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function ArrowDown (props) {
	return (
		<Svg width={11} height={16} viewBox='0 0 11 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
			<Path
				d='M5.5 14.875l4.5-4.5m-4.5 4.5v-13.5 13.5zm0 0l-4.5-4.5 4.5 4.5z'
				stroke='#589CEC'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export default ArrowDown
