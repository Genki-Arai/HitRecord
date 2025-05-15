import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { HitDataType2, hitDataTypeWithDate } from "../commonTypes/types";
import HitResultBase from "./HitResultBase";
import { useNavigation } from "@react-navigation/native";

export default (props: hitDataTypeWithDate) => {
  const getNumberOfShots = (hitData: HitDataType2[]): number => {
    let numberOfShots = 0;
    hitData.forEach((hitData: HitDataType2) => {
      if (hitData.first == 1 || hitData.first == 0) numberOfShots++;
      if (hitData.second == 1 || hitData.second == 0) numberOfShots++;
      if (hitData.third == 1 || hitData.third == 0) numberOfShots++;
      if (hitData.fourth == 1 || hitData.fourth == 0) numberOfShots++;
    });
    return numberOfShots;
  };

  const getNumberOfHits = (hitData: HitDataType2[]): number => {
    let numberOfHits = 0;
    hitData.forEach((hitData: HitDataType2) => {
      if (hitData.first) numberOfHits++;
      if (hitData.second) numberOfHits++;
      if (hitData.third) numberOfHits++;
      if (hitData.fourth) numberOfHits++;
    });
    return numberOfHits;
  };

  const navigation = useNavigation();


  return (
    <TouchableOpacity style={styles.container}>
      <Text>{props.date}</Text>
      <View>
        <Text>
          {getNumberOfHits(props.hitDataList)}/
          {getNumberOfShots(props.hitDataList)}
        </Text>
        <Text>
          {Math.floor(
            (getNumberOfHits(props.hitDataList) /
              getNumberOfShots(props.hitDataList)) *
              100
          )}
          %
        </Text>
      </View>
    </TouchableOpacity>
  );
};

type ShowDateHitDataStyle = {
  container: ViewStyle;
};

const styles: ShowDateHitDataStyle = {
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    padding: 15,
    marginHorizontal: 10,
  },
};
