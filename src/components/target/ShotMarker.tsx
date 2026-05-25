import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { LayoutInfoType, ShotPropType } from "./TargetUI.type";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Text, View, StyleSheet } from "react-native";

export default (props: {
  shot: ShotPropType;
  size: number;
  activeIndex?: number;
  onShotDragEnd?: (
    arrow_index: number,
    x_normalized: number,
    y_normalized: number,
  ) => void;
  targetLayout?: LayoutInfoType | null;
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isPressed = useSharedValue(false);

  const handleDragEnd = (pageX: number, pageY: number) => {
    const center_x = props.targetLayout!.x + props.targetLayout!.w / 2;
    const center_y = props.targetLayout!.y + props.targetLayout!.h / 2;

    const x_normalized = (pageX - center_x) / props.size;
    const y_normalized = (pageY - center_y) / props.size;

    if (props.onShotDragEnd) {
      props.onShotDragEnd(props.shot.arrow_index, x_normalized, y_normalized);
    }
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      isPressed.value = true;
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onFinalize((event) => {
      runOnJS(handleDragEnd)(event.absoluteX, event.absoluteY);
      isPressed.value = false;
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: withSpring(isPressed.value ? 1.2 : 1) },
    ],
    opacity: withSpring(isPressed.value ? 0.9 : 1),
    zIndex: isPressed.value ? 100 : 1,
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View 
        style={[
            styles.arrowPoint, 
            animatedStyle,
            {
                left: props.size / 2 + props.shot.x_normalized * props.size - 12,
                top: props.size / 2 + props.shot.y_normalized * props.size - 12,
                backgroundColor: props.shot.arrow_index === (props.activeIndex ?? 0) - 1 ? "#FFD700" : "#2D5A27",
                 justifyContent: "center",
                 alignItems: "center",
            }
            ]}>
        <Text style={{
            color: props.shot.arrow_index === (props.activeIndex ?? 0) - 1 ? "black" : "white",
            fontSize: 10,
            fontWeight: "bold",
        }}>{props.shot.arrow_index + 1}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  arrowPoint: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FFF",
    zIndex: 10,
  },
});
