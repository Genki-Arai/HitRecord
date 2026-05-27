import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  JudgeResultType,
  LayoutInfoType,
  TargetUIHandleType,
  TargetUIProps,
} from "./TargetUI.type";
import ShotMarker from "./ShotMarker";

export const TargetUI = forwardRef<TargetUIHandleType, TargetUIProps>(
  (props: TargetUIProps, ref) => {
    const [targetLayout, setTargetLayout] = useState<LayoutInfoType | null>(
      null,
    );

    const targetRef = useRef<View>(null);

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

    const judge = (pageX: number, pageY: number): JudgeResultType => {
      const center_x = targetLayout!.x + targetLayout!.w / 2;
      const center_y = targetLayout!.y + targetLayout!.h / 2;

      const x_normalized = (pageX - center_x) / props.size;
      const y_normalized = (pageY - center_y) / props.size;

      const distance_normalized = Math.sqrt(
        x_normalized ** 2 + y_normalized ** 2,
      );

      const isInside = // 的View矩形内かどうか
        pageX >= targetLayout!.x &&
        pageX <= targetLayout!.x + targetLayout!.w &&
        pageY >= targetLayout!.y &&
        pageY <= targetLayout!.y + targetLayout!.h;

      const isHit = distance_normalized <= 0.5; // 的中判定

      return {
        is_inside: isInside,
        x_normalized: x_normalized,
        y_normalized: y_normalized,
        is_hit: isHit,
      };
    };

    useImperativeHandle(ref, () => ({ judge }), [targetLayout, props.size]);

    const styles = useMemo(() => StyleSheet.create({
      blackCircleOuter: {
        width: props.size,
        height: props.size,
        backgroundColor: "black",
        borderRadius: props.size / 2,
        justifyContent: "center",
        alignItems: "center",
        // elevation: 4,
        // shadowColor: "#000",
        // shadowOpacity: 0.1,
        // shadowRadius: 8,
      },
      blackCircleMiddle: {
        width: props.size * 0.667,
        height: props.size * 0.667,
        borderRadius: (props.size * 0.667) / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      },
      blackCircleInner: {
        width: props.size * 0.417,
        height: props.size * 0.417,
        borderRadius: (props.size * 0.417) / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      },
      whiteCircleOuter: {
        width: props.size * 0.833,
        height: props.size * 0.833,
        borderRadius: (props.size * 0.833) / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      },
      whiteCircleMiddle: {
        width: props.size * 0.583,
        height: props.size * 0.583,
        borderRadius: (props.size * 0.583) / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      },
      whiteCircleInner: {
        width: props.size * 0.208,
        height: props.size * 0.208,
        borderRadius: (props.size * 0.208) / 2,
        backgroundColor: "white",
      },
      arrowPoint: {
        position: "absolute",
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#FFF",
        zIndex: 10,
      },
    }), [props.size]);

    return (
        <View
          style={{
            backgroundColor: "#dcd3b2",
            height: props.size * 1.27, // 画面幅の95%を入力範囲の高さとする
            width: props.size * 1.2, // 画面幅の90%を入力範囲の幅とする
            alignItems: "center",
            justifyContent: "center",
            borderRadius: props.size * 0.05,
            marginHorizontal: 'auto',
          }}
          ref={targetRef}
          onLayout={measureTarget}
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

            {/* 矢所プロット (-12の補正込み) */}
            {props.shots.map((shot, idx) => (
              <ShotMarker 
                key={idx} 
                shot={shot} 
                size={props.size} 
                activeIndex={props.shots.length} 
                targetLayout={targetLayout} 
                onShotDragEnd={props.onShotDragEnd} />
            ))}
          </View>
        </View>
      
    );
  },
);
