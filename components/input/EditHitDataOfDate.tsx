import React, { ReactElement } from "react";
import { useRoute } from "@react-navigation/native";
import { View } from "react-native";
import HitResultBase from "./HitResultBase";
import { HitDataType2 } from "../../types/input/HitDataType2";
import {
  EditHitDataOfDateProps,
  EditHitDataOfDateRouteProps,
} from "../../types/input/navigationTypes";
import { EditHitDataOfDateStyles } from "./styles_input/StylesOfInput";

export const EditHitDataOfDate: React.FC<EditHitDataOfDateProps> = () => {
  const editHitDataOfDateRoute = useRoute<EditHitDataOfDateRouteProps>();

  const { date, hitDataList } = editHitDataOfDateRoute.params;

  return (
    <View style={EditHitDataOfDateStyles.container}>
      {(function () {
        const hitDatas: ReactElement[] = [];
        hitDataList.forEach((hitData: HitDataType2, index: number) => {
          hitDatas.push(
            <HitResultBase
              key={index}
              id={hitData.id}
              first={hitData.first}
              second={hitData.second}
              third={hitData.third}
              fourth={hitData.fourth}
            />
          );
        });
        return hitDatas;
      })()}
    </View>
  );
};
