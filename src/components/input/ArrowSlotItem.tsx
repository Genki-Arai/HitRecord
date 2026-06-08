import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { ShotPropType } from "../target/TargetUI.type";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Text, View } from "react-native";
import { Target as TargetIcon } from "lucide-react-native";


export default (props: {
    arrow_index: number;
    isRecorded: boolean;
    shot?: ShotPropType;
    onFinalize: (arrow_index: number, absoluteX: number, absoluteY: number) => void;
}) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const isPressed = useSharedValue(false);

    const panGesture = Gesture.Pan()
        .onStart(() => {
            isPressed.value = true;
        })
        .onUpdate((event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        })
        .onFinalize((event) => {
            runOnJS(props.onFinalize)(props.arrow_index, event.absoluteX, event.absoluteY);
            isPressed.value = false;
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
        })

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: withSpring(isPressed.value ? 1.2 : 1) },
        ],
        opacity: withSpring(isPressed.value ? 0.9 : 1),
        zIndex: isPressed.value ? 100 : 1,
    }))

    return (
        props.isRecorded ? (
            <View>
                <Text>
                    {props.shot?.is_hit ? "⚪︎" : "×"}
                </Text>
            </View>
        ) : (
            <GestureDetector gesture={panGesture}>
                <Animated.View style={animatedStyle} >
                    <TargetIcon />
                </Animated.View>
            </GestureDetector>
        )
    )
}