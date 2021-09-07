import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useAnimatedRef } from 'react-native-reanimated'

const ThreeSection = () => {
    const one = useAnimatedRef()
    const two = useAnimatedRef()
    const three = useAnimatedRef()
    const size = 55
    const barSize = size/7

    const measure = (ref) => {
        if (ref.current) {
            ref.current.measure((x, y, width, height, pageX, pageY) => {
                console.log(x, y, width, height, pageX, pageY)
            })
        }
    }

    return (
        <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 20}} >
            <Pressable ref={one} onPress={() => measure(one)} style={{width: size, height: size, borderRadius: size/2, backgroundColor: 'grey', alignItems: 'center', justifyContent: 'center'}} >
            <View style={{width: size, height: size, borderRadius: size/2, backgroundColor: 'darkblue', position: 'absolute', transform: [{translateX:0}]}} />
            </Pressable>
            <View style={{height: barSize, flex: 1, backgroundColor: 'grey'}} />
            <Pressable ref={two} onPress={() => measure(two)} style={{width: size, height: size, borderRadius: size/2, backgroundColor: 'grey'}}/>
            <View style={{height: barSize, flex: 1, backgroundColor: 'grey'}} />
            <Pressable ref={three} onPress={() => measure(three)} style={{width: size, height: size, borderRadius: size/2, backgroundColor: 'grey'}}/>
        </View>
    )
}

export default ThreeSection

const styles = StyleSheet.create({})
