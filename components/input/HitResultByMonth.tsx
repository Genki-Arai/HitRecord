import { Text, View } from "react-native";
import { hitDataTypeWithDate, hitDataTypeWithMonth } from "../commonTypes/types";
import { sortByDate } from "../database/hitDataControl";
import { ReactElement } from "react";
import HitResultByDate from "./HitResultByDate";

export default (props: hitDataTypeWithMonth) => {

    const hitDataList: hitDataTypeWithDate[] = sortByDate(props.hitDataList);


  return (
    <>
      <View>
        <Text>{props.month}</Text>
      </View>
      <View>
        {function () {
            const dateHitDataList: ReactElement[] = [];
            hitDataList.forEach((hitData: hitDataTypeWithDate, index: number) => {
                dateHitDataList.push(
                <HitResultByDate date={hitData.date} hitDataList={hitData.hitDataList} key={index} />
                );
            });
    
            return dateHitDataList;
        }()}
      </View>
    </>
  );
};
