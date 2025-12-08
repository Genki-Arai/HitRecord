import React, { ReactElement } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, ScrollView } from "react-native";
import HitResultBase from "./HitResultBase";
import { HitDataType2 } from "../../types/input/HitDataType2";
import {
  EditHitDataOfDateProps,
  EditHitDataOfDateRouteProps,
} from "../../types/input/navigationTypes";
import { EditHitDataOfDateStyles } from "../../styles/input/StylesOfInput";
import { format } from "date-fns";

export const EditHitDataOfDate: React.FC<EditHitDataOfDateProps> = () => {
  const editHitDataOfDateRoute = useRoute<EditHitDataOfDateRouteProps>();

  const { date, hitDataList } = editHitDataOfDateRoute.params;

  return (
    <View style={EditHitDataOfDateStyles.container}>
      <View>
        <Text>{format(new Date(date), "M月d日")}</Text>
      </View>
      <ScrollView style={{ backgroundColor: "white" }}>
        {(function () {
          const hitDatas: ReactElement[] = [];
          hitDataList.forEach((hitData: HitDataType2, index: number) => {
            hitDatas.push(
              <View key={index} style={EditHitDataOfDateStyles.datasView}>
                <View>
                  <Text>{index + 1}立目</Text>
                </View>
                <View>
                  <HitResultBase
                    key={index}
                    id={hitData.id}
                    first={hitData.first}
                    second={hitData.second}
                    third={hitData.third}
                    fourth={hitData.fourth}
                  />
                </View>
              </View>
            );
          });
          return hitDatas;
        })()}
      </ScrollView>
    </View>
  );
};
