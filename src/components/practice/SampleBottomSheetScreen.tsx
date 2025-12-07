// import BottomSheet from "@gorhom/bottom-sheet";
// import { useCallback, useMemo, useRef } from "react";
// import { Button, StyleSheet, Text, View } from "react-native";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// export const MyBottomSheetScreen = () => {
//   // ref を作成して BottomSheet インスタンスへの参照を保持
//   const bottomSheetRef = useRef<any>(null);

//   // BottomSheet のスナップポイント (高さの割合またはピクセル値)
//   // 例えば、25%の高さ、50%の高さ、100%の高さ
//   const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

//   // BottomSheet を開くためのコールバック
//   const handleOpenPress = useCallback(() => {
//     bottomSheetRef.current?.expand(); // または bottomSheetRef.current?.snapToIndex(0);
//   }, []);

//   // BottomSheet を閉じるためのコールバック
//   const handleClosePress = useCallback(() => {
//     bottomSheetRef.current?.close();
//   }, []);

//   // BottomSheet の状態が変更されたときに呼び出されるコールバック
//   const handleSheetChanges = useCallback((index: any) => {
//     console.log('sheet index', index);
//   }, []);

//   return (
//     // ★ @gorhom/bottom-sheet を使用する際には、アプリのルートか、
//     // ボトムシートがレンダリングされるコンポーネントツリーの最上位に
//     // GestureHandlerRootView を配置する必要があります。
//     // 通常はApp.tsxのReturn直下や、メインのViewの親などに置きます。
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <Text style={styles.title}>メインコンテンツ</Text>
//         <Button title="追加ボタン (ボトムシートを開く)" onPress={handleOpenPress} />

//         {/* ボトムシートコンポーネント */}
//         <BottomSheet
//           ref={bottomSheetRef}
//           index={-1} // 初期状態では非表示 (最小-1)
//           snapPoints={snapPoints}
//           onChange={handleSheetChanges}
//           enablePanDownToClose={true} // 下にドラッグで閉じられるようにする
//           backgroundStyle={styles.bottomSheetBackground} // 背景スタイル
//           handleIndicatorStyle={styles.bottomSheetHandle} // ハンドル部分のスタイル
//         >
//           <View style={styles.contentContainer}>
//             <Text style={styles.contentTitle}>入力フォーム</Text>
//             {/* ここに入力フィールドやその他のコンポーネントを配置 */}
//             <Text>ここにフォームの要素が入ります。</Text>
//             <Button title="閉じる" onPress={handleClosePress} />
//           </View>
//         </BottomSheet>
//       </View>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 50,
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   contentContainer: {
//     flex: 1,
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   contentTitle: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
//   bottomSheetBackground: {
//     backgroundColor: '#f0f0f0', // ボトムシートの背景色
//   },
//   bottomSheetHandle: {
//     backgroundColor: 'gray', // ハンドルインジケーターの色
//   },
// });

import React, { useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { HitRecordColors } from "../../../styles/constants/colors/HitRecordColors";

export default () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      index={-1} // 初期状態では非表示
      // enablePanDownToClose={true} // 下にドラッグで閉じられるようにする
      enableOverDrag={true} // オーバードラッグを有効にする
      snapPoints={["50%", "75%"]} // スナップポイントの設定'
      // style={styles.container}
      handleStyle={styles.container}
      keyboardBehavior="fillParent"
    >
      <ScrollView>
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
          <TouchableOpacity>
            <Text>こんちは</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </ScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 3,
    backgroundColor: HitRecordColors.secondary,
  },
  contentContainer: {
    flex: 1,
    margin: 20,
    padding: 36,
    alignItems: "center",
    backgroundColor: HitRecordColors.secondary,
    borderRadius: 12,
  },
});
