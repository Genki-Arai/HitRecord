import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { forwardRef, useMemo, useRef, useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { HitRecordColors } from "../../styles/constants/colors/HitRecordColors";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { AddDataAreaStyles } from "../../styles/input/StylesOfInput";
import AddDate from "./AddDate";
import {
  HitDataTypeSimple,
  initialHitDataTypeSimple,
} from "../../types/input/HitDataTypeSimple";
import AddPosition from "./AddPosition";
import AddResult from "./AddResult";
import DropdownPractice from "../../components/practice/DropdownPractice";
import DropdownModalPractice from "../../components/practice/DropdownModalPractice";

export default forwardRef<BottomSheetMethods>(
  (props, ref: React.ForwardedRef<BottomSheetMethods>) => {
    // データ追加用ボトムシートの開閉を管理するrefをpropsから受け取る
    const addDataBottomSheetRef: React.RefObject<BottomSheetMethods | null> =
      useRef<BottomSheet>(null);
    // ボトムシートが止まる位置
    const snapPoints = useMemo(() => ["97%"], []);
    // シートの内容が変わった時のコールバック
    const handleSheetChanges = (index: number) => {
      console.log("handleSheetChanges", index);
    };

    // ボトムシートを閉じる関数
    const bottomSheetClose = () => {
      if (ref !== null && typeof ref !== "function") {
        ref.current?.close();
      }
    };

    // string型じゃないほうが良いかも→検討
    const [addDate, setAddDate] = useState<string>(
      new Date().toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" })
    );
    const [addPosition, setAddPosition] = useState<number>(1);
    const [addResult, setAddResult] = useState<HitDataTypeSimple>(
      initialHitDataTypeSimple
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1} // 初期表示のスナップポイント（-1なら非表示）
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true} // 下にスワイプして閉じれるようにする
        enableContentPanningGesture={false} // シート内のコンテンツでのパン操作を有効にする
      >
        <BottomSheetView style={AddDataAreaStyles.container}>
          <Text>ここに詳細情報やメニューを配置します 🎉</Text>
          <AddDate date={addDate} setDate={setAddDate} />
          <AddResult result={addResult} setResult={setAddResult} />
          <AddPosition position={addPosition} setPosition={setAddPosition} />
          {/* <DropdownModalPractice /> */}
          <TouchableOpacity
            onPress={bottomSheetClose}
            style={AddDataAreaStyles.saveButtonArea}
          >
            <Text>閉じる(いずれ保存)</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);
