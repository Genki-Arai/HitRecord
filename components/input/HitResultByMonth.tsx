import { Text, View } from "react-native";
import { sortByDate } from "../database/hitDataControl";
import { ReactElement } from "react";
import HitResultByDate from "./HitResultByDate";
import { hitDataTypeWithDate } from "../../types/input/hitDataTypeWithDate";
import { hitDataTypeWithMonth } from "../../types/input/hitDataTypeWithMonth";
import { hitResultByDateStyles, HitResultByMonthStyles } from "./styles_input/StylesOfInput";

export default (props: hitDataTypeWithMonth) => {
  const hitDataList: hitDataTypeWithDate[] = sortByDate(props.hitDataList);

  return (
    <>
      <View style={HitResultByMonthStyles.monthView}>
        <Text>{props.month}</Text> {/* ◯年◯月 */}
      </View>
      <View>
        {(function () {
          const dateHitDataList: ReactElement[] = [];
          hitDataList.forEach((hitData: hitDataTypeWithDate, index: number) => {
            dateHitDataList.push(
              <HitResultByDate
                date={hitData.date}
                hitDataList={hitData.hitDataList}
                key={index}
              />
            );
          });

          return dateHitDataList;
        })()}
      </View>
    </>
  );
};
