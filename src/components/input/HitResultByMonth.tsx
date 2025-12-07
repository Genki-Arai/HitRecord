import { Text, View } from "react-native";
import { ReactElement } from "react";
import HitResultByDate from "./HitResultByDate";
import { hitDataTypeWithDate } from "../../../types/input/hitDataTypeWithDate";
import { hitDataTypeWithMonth } from "../../../types/input/hitDataTypeWithMonth";
import { HitResultByMonthStyles } from "./styles_input/StylesOfInput";
import { sortByDate } from "../database/sortHitData";

export default (props: hitDataTypeWithMonth) => {
  const hitDataList: hitDataTypeWithDate[] = sortByDate(props.hitDataList);

  return (
    <>
      <View style={HitResultByMonthStyles.monthView}>
        {/* ◯年◯月 */}
        <Text>{props.month}</Text>
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
