import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Screen from "../../utils/screenInformation"
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler"
import { Color } from "../Colors"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"

type BottomSheetProps = {
    children:(totalRaiting: number,scrollTo: (destination: number) => void)=>React.ReactNode,
    maxTranslationY: number,
    totalRaiting:number|undefined
}
export type BottomSheetRefProps = {
    scrollTo: (destination: number) => void,
    isActive: () => boolean
}
const BottomSheet = memo(forwardRef<BottomSheetRefProps, BottomSheetProps>((props, ref) => {
    const {
        children,
        maxTranslationY, 
        totalRaiting
    } = props
    console.log(totalRaiting)
    const translationY = useSharedValue(0);
    const active = useSharedValue(false);
    const context = useSharedValue({ y: 0 });
       
    const scrollTo = useCallback((destination: number) => {
        'worklet';
        active.value = destination !== 0
        // console.log(active.value)
        translationY.value = withSpring(destination, { damping: 30 })
    }
    , [])

    const isActive = useCallback(() => {
        return active.value
    }, [])
    useImperativeHandle(ref, () => ({ scrollTo, isActive }),
        [scrollTo,
            isActive
        ])
    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translationY.value }
        })
        .onUpdate((event) => {
            translationY.value = event.translationY + context.value.y
            translationY.value = Math.max(translationY.value, maxTranslationY)// lấy giá trị lớn hơn
        })
        .onEnd(() => {
            scrollTo(translationY.value > maxTranslationY / 2 ? 0 : maxTranslationY);
        });
    const rBottomSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translationY.value }]
        }
    })
    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
                <View style={styles.line} />
                 {children(totalRaiting||0,scrollTo)}
            </Animated.View>
        </GestureDetector>
    )
}),(prev,next)=>prev.totalRaiting===next.totalRaiting&&prev.maxTranslationY===prev.maxTranslationY)
export default BottomSheet

const styles = StyleSheet.create({
    bottomSheetContainer: {
        height: Screen.height,
        backgroundColor: "#e5e5e5",
        position: 'absolute',
        zIndex: 10,
        width: Screen.width,
        top: Screen.height,
        borderRadius: 20,
    },
    line: {
        width: 50,
        height: 4,
        alignSelf: 'center',
        backgroundColor: Color.Gray,
        marginVertical: 10,
        borderRadius: 10
    }
})