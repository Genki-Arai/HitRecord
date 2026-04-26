import React, { useState, useCallback, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import {
  Target as TargetIcon,
  RotateCcw,
  Save,
  MapPin,
} from "lucide-react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TARGET_SIZE = SCREEN_WIDTH * 0.75;

// 型定義
interface ArrowPosition {
  x: number;
  y: number;
  index: number;
}

interface LayoutInfo {
  x: number;
  y: number;
  w: number;
  h: number;
}

export default function InputDataScreen() {
  const [hits, setHits] = useState<(boolean | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [arrowPositions, setArrowPositions] = useState<ArrowPosition[]>([]);
  const [activeArrowIndex, setActiveArrowIndex] = useState<number>(0);
  const [targetLayout, setTargetLayout] = useState<LayoutInfo | null>(null);

  // 的のView参照
  const targetRef = useRef<View>(null);

  // Reanimated Shared Values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isPressed = useSharedValue(false);

  // 的の座標を計測
  const measureTarget = useCallback(() => {
    if (targetRef.current) {
      targetRef.current.measure((x, y, w, h, pageX, pageY) => {
        if (pageX !== 0 || pageY !== 0) {
          setTargetLayout({ x: pageX, y: pageY, w: w, h: h });
        }
      });
    }
  }, []);

  // JSスレッドでの判定・更新処理
  const processRelease = (pageX: number, pageY: number) => {
    if (!targetLayout) {
      measureTarget();
      return;
    }

    const isInside =
      pageX >= targetLayout.x &&
      pageX <= targetLayout.x + targetLayout.w &&
      pageY >= targetLayout.y &&
      pageY <= targetLayout.y + targetLayout.h;

    if (isInside && activeArrowIndex < 4) {
      const relX = pageX - (targetLayout.x + targetLayout.w / 2);
      const relY = pageY - (targetLayout.y + targetLayout.h / 2);

      const distance = Math.sqrt(relX * relX + relY * relY);
      const isHit = distance < targetLayout.w / 2;

      setHits((prev) => {
        const next = [...prev];
        next[activeArrowIndex] = isHit;
        return next;
      });

      setArrowPositions((prev) => [
        ...prev,
        { x: relX, y: relY, index: activeArrowIndex },
      ]);

      setActiveArrowIndex((prev) => prev + 1);
    }
  };

  // ジェスチャー定義
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onFinalize((event) => {
      // 指を離した位置で判定
      runOnJS(processRelease)(event.absoluteX, event.absoluteY);

      // アニメーションで復帰
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      isPressed.value = false;
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

  const resetEntry = () => {
    setHits([null, null, null, null]);
    setArrowPositions([]);
    setActiveArrowIndex(0);
    measureTarget();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.main}>
          <View style={styles.inputContainer}>
            <View style={styles.inputHeader}>
              <View style={styles.locationTag}>
                <MapPin size={14} color="#2D5A27" />
                <Text style={styles.locationText}>いつもの道場</Text>
              </View>
              <TouchableOpacity onPress={resetEntry} style={styles.resetBtn}>
                <RotateCcw size={18} color="#666" />
                <Text style={styles.resetText}>リセット</Text>
              </TouchableOpacity>
            </View>

            {/* 的エリア */}
            <View
              style={{
                backgroundColor: "#dcd3b2",
                height: SCREEN_WIDTH * 0.95,
                width: SCREEN_WIDTH * 0.9,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 16,
              }}
              ref={targetRef}
              onLayout={() => setTimeout(measureTarget, 500)}
            >
              <View style={styles.blackCircleOuter}>
                <View style={styles.whiteCircleOuter}>
                  <View style={styles.blackCircleMiddle}>
                    <View style={styles.whiteCircleMiddle}>
                      <View style={styles.blackCircleInner}>
                        <View style={styles.whiteCircleInner} />
                      </View>
                    </View>
                  </View>
                </View>

                {/* 矢所プロット (-6の補正込み) */}
                {arrowPositions.map((pos, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.arrowPoint,
                      {
                        left: TARGET_SIZE / 2 + pos.x - 6,
                        top: TARGET_SIZE / 2 + pos.y - 6,
                        backgroundColor:
                          pos.index === activeArrowIndex - 1
                            ? "#FFD700"
                            : "#2D5A27",
                      },
                    ]}
                  />
                ))}
              </View>
            </View>

            <Text style={styles.instruction}>
              {activeArrowIndex < 4
                ? `${activeArrowIndex + 1}本目を的にドラッグ`
                : "全ての入力が完了しました"}
            </Text>

            {/* スロットエリア */}
            <View style={styles.dragContainer}>
              {hits.map((hit, i) => (
                <View key={i} style={styles.arrowSlot}>
                  {i === activeArrowIndex ? (
                    <GestureDetector gesture={panGesture}>
                      <Animated.View
                        style={[styles.draggableIcon, animatedStyle]}
                      >
                        <TargetIcon size={32} color="#2D5A27" />
                      </Animated.View>
                    </GestureDetector>
                  ) : (
                    <View
                      style={[
                        styles.staticIcon,
                        hit === true && styles.hitIcon,
                        hit === false && styles.missIcon,
                      ]}
                    >
                      <Text
                        style={[
                          styles.iconText,
                          hit !== null && { color: "#FFF" },
                        ]}
                      >
                        {hit === null ? i + 1 : hit ? "○" : "×"}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.saveButton,
                activeArrowIndex < 4 && styles.saveButtonDisabled,
              ]}
              disabled={activeArrowIndex < 4}
            >
              <Save size={20} color="#FFF" />
              <Text style={styles.saveButtonText}>記録を保存する</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  main: { flex: 1 },
  inputContainer: { flex: 1, padding: 20, alignItems: "center" },
  inputHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  locationTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: 8,
    borderRadius: 8,
  },
  locationText: {
    fontSize: 12,
    color: "#2D5A27",
    marginLeft: 4,
    fontWeight: "bold",
  },
  resetBtn: { flexDirection: "row", alignItems: "center" },
  resetText: { fontSize: 12, color: "#666", marginLeft: 4 },
  blackCircleOuter: {
    width: TARGET_SIZE,
    height: TARGET_SIZE,
    backgroundColor: "black",
    borderRadius: TARGET_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    // elevation: 4,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
  },
  blackCircleMiddle: {
    width: TARGET_SIZE * 0.667,
    height: TARGET_SIZE * 0.667,
    borderRadius: (TARGET_SIZE * 0.667) / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  blackCircleInner: {
    width: TARGET_SIZE * 0.417,
    height: TARGET_SIZE * 0.417,
    borderRadius: (TARGET_SIZE * 0.417) / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  whiteCircleOuter: {
    width: TARGET_SIZE * 0.833,
    height: TARGET_SIZE * 0.833,
    borderRadius: (TARGET_SIZE * 0.833) / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  whiteCircleMiddle: {
    width: TARGET_SIZE * 0.583,
    height: TARGET_SIZE * 0.583,
    borderRadius: (TARGET_SIZE * 0.583) / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  whiteCircleInner: {
    width: TARGET_SIZE * 0.208,
    height: TARGET_SIZE * 0.208,
    borderRadius: (TARGET_SIZE * 0.208) / 2,
    backgroundColor: "white",
  },
  arrowPoint: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#FFF",
    zIndex: 10,
  },
  instruction: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    fontWeight: "500",
  },
  dragContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 40,
  },
  arrowSlot: {
    width: 65,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
  },
  draggableIcon: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  staticIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  hitIcon: { backgroundColor: "#2D5A27", borderColor: "#2D5A27" },
  missIcon: { backgroundColor: "#B22222", borderColor: "#B22222" },
  iconText: { fontWeight: "bold", color: "#999" },
  saveButton: {
    width: "100%",
    height: 55,
    backgroundColor: "#2D5A27",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonDisabled: { backgroundColor: "#CCC" },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
