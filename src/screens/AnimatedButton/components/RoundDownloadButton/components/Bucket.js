import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function Bucket (props) {
	return (
		<Svg width={25} height={7} viewBox='0 0 25 7' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
			<Path
				d='M1.25 1.125l.699 2.796A2.25 2.25 0 004.13 5.625H20.87a2.25 2.25 0 002.182-1.704l.699-2.796'
				stroke='#589CEC'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export default Bucket
