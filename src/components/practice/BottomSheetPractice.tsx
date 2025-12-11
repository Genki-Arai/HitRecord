import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default () => {
  // BottomSheetへの参照（開閉操作に使用）
  const bottomSheetRef = useRef<BottomSheet>(null);

  // スナップポイント（シートが止まる位置）
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // シートの内容が変わった時のコールバック
  const handleSheetChanges = useCallback((index: any) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    // {/* // ジェスチャーを検知するために全体をGestureHandlerRootViewで囲む必要があります */}

    <View style={styles.container}>
      <Button
        title="ボトムシートを開く"
        onPress={() => bottomSheetRef.current?.expand()}
      />

      {/* ボトムシート本体 */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // 初期表示のスナップポイント（-1なら非表示）
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true} // 下にスワイプして閉じれるようにする
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>ここに詳細情報やメニューを配置します 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
});
