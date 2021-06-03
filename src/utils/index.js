export const clamp = (value, lowerBound, upperBound) => {
	'worklet'
	return Math.min(Math.max(lowerBound, value), upperBound)
}

export const toRad = (deg) => {
	'worklet'
	return deg * Math.PI / 180
}
