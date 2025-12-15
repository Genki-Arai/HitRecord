import { ReactElement, useContext, useMemo, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import HitResultByMonth from "./HitResultByMonth";
import { hitDataTypeWithMonth } from "../../types/input/hitDataTypeWithMonth";
import { HitRecordColors } from "../../styles/constants/colors/HitRecordColors";
import { sortByMonth } from "../../utils/database/sortHitData";
import { InputContext } from "./InputContext";
import SampleBottomSheetScreen from "../../components/practice/SampleBottomSheetScreen";
import BottomSheetPractice from "../../components/practice/BottomSheetPractice";
import BottomSheet from "@gorhom/bottom-sheet";
import BottomSheetForAddData from "./BottomSheetForAddData";
import AddDataButton from "./AddDataButton";

/**
 * すべてのデータを取得し、日付ごとに表示する。
 * アプリ起動時の最初の画面になる想定。
 */
export default () => {
  const inputContext = useContext(InputContext);

  // const [modalSwitch, setModalSwitch] = useState<boolean>(false);
  // データ追加用ボトムシートのref
  const addDataBottomSheetRef = useRef<BottomSheet>(null);
  // データ追加用ボトムシートを開く関数
  const addDataBottomSheetOpen = () => {
    addDataBottomSheetRef.current?.expand();
  }
  const addDataBottomSheetClose = () => {
    addDataBottomSheetRef.current?.close();
  }

  if (!inputContext) {
    console.error("InputContext is not provided.");
    return null;
  }

  const { allHitDataList } = inputContext;

  return (
    <View style={styles.container}>
      <View style={styles.addButtonArea}>
        {/* <TouchableOpacity
          style={styles.addDataButton}
          // onPress={() => setModalSwitch(true)}
        >
          <Text>追加</Text>
        </TouchableOpacity> */}
        <AddDataButton addDataBottomSheetOpen={addDataBottomSheetOpen} />
        {/* <BottomSheetForAddData /> */}
      </View>

      <ScrollView>
        {(function () {
          const hitDataList: ReactElement[] = [];
          sortByMonth(allHitDataList).forEach(
            (hitData: hitDataTypeWithMonth, index: number) => {
              hitDataList.push(
                <HitResultByMonth
                  month={hitData.month}
                  hitDataList={hitData.hitDataList}
                  key={index}
                />
              );
            }
          );

          return hitDataList;
        })()}
      </ScrollView>
      <BottomSheetForAddData 
      ref={addDataBottomSheetRef} 
      />
    </View>
  );
};

type InputMainStyle = {
  container: ViewStyle;
  addButtonArea: ViewStyle;
  addDataButton: ViewStyle;
};

const styles: InputMainStyle = {
  container: {
    flex: 1,
    backgroundColor: HitRecordColors.background,
    width: "100%",
  },
  addDataButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: HitRecordColors.gray,
    width: "auto",
  },
  addButtonArea: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
};
