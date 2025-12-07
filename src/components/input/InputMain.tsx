import { ReactElement, useContext, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import HitResultByMonth from "./HitResultByMonth";
import { hitDataTypeWithMonth } from "../../../types/input/hitDataTypeWithMonth";
import { HitRecordColors } from "../../../styles/constants/colors/HitRecordColors";
import { sortByMonth } from "../database/sortHitData";
import { InputContext } from "./InputContext";
import SampleBottomSheetScreen from "../practice/SampleBottomSheetScreen";

/**
 * すべてのデータを取得し、日付ごとに表示する。
 * アプリ起動時の最初の画面になる想定。
 */
export default () => {
  const inputContext = useContext(InputContext);

  const [modalSwitch, setModalSwitch] = useState<boolean>(false);

  if (!inputContext) {
    console.error("InputContext is not provided.");
    return null;
  }

  const { allHitDataList } = inputContext;

  return (
    <View style={styles.container}>
      <View style={styles.addButtonArea}>
        <TouchableOpacity
          style={styles.addDataButton}
          onPress={() => setModalSwitch(true)}
        >
          <Text>追加</Text>
        </TouchableOpacity>
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
