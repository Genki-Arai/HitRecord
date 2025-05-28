import { ReactElement, useEffect, useState } from "react";
import { ScrollView, ViewStyle } from "react-native";
import { getAllHitData, sortByMonth } from "../database/hitDataControl";
import HitResultByMonth from "./HitResultByMonth";
import { hitDataTypeWithMonth } from "../../types/input/hitDataTypeWithMonth";
import { HitRecordColors } from "../../styles/constants/colors/HitRecordColors";

/**
 * すべてのデータを取得し、日付ごとに表示する。
 * アプリ起動時の最初の画面になる想定。
 */
export default () => {
  const [allHitDataList, setAllHitDataList] = useState<hitDataTypeWithMonth[]>(
    []
  );

  useEffect(() => {
    (async () => {
      const dataList = await getAllHitData();
      if (dataList) {
        const dataListByMonth = sortByMonth(dataList);
        setAllHitDataList(dataListByMonth);
      }
    })();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {(function () {
        const hitDataList: ReactElement[] = [];
        allHitDataList.forEach(
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
  );
};

type InputMainStyle = {
  container: ViewStyle;
};

const styles: InputMainStyle = {
  container: {
    flex: 1,
    backgroundColor: HitRecordColors.background,
    width: "100%",
  },
};
