import { ReactElement, useContext, useEffect, useState } from "react";
import { ScrollView, ViewStyle } from "react-native";
import HitResultByMonth from "./HitResultByMonth";
import { hitDataTypeWithMonth } from "../../types/input/hitDataTypeWithMonth";
import { HitRecordColors } from "../../styles/constants/colors/HitRecordColors";
import { getAllHitData } from "../database/selectHitData";
import { sortByMonth } from "../database/sortHitData";
import { InputContext } from "./InputContext";

/**
 * すべてのデータを取得し、日付ごとに表示する。
 * アプリ起動時の最初の画面になる想定。
 */
export default () => {

  // --------------------------------------------------
  const inputContext = useContext(InputContext);
  
  if(!inputContext) {
    console.error("InputContext is not provided.");
    return null;
  }

  const { allHitDataList, setAllHitDataList } = inputContext;

  // --------------------------------------------------
  // const [allHitDataList, setAllHitDataList] = useState<hitDataTypeWithMonth[]>(
  //   []
  // );

  // useEffect(() => {
  //   (async () => {
  //     const dataList = await getAllHitData();
  //     if (dataList) {
  //       setAllHitDataList(sortByMonth(dataList));
  //     }
  //   })();
  // }, []);

  return (
    <ScrollView style={styles.container}>
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
      {/* {(function () {
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
      })()} */}
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
