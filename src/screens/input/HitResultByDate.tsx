import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  getNumberOfHits,
  getNumberOfShots,
} from "../../../methods/input/getNumberOf";
import { hitDataTypeWithDate } from "../../../types/input/hitDataTypeWithDate";
import { EditHitDataOfDateNaviProps } from "../../../types/input/navigationTypes";
import { hitResultByDateStyles } from "../../styles/input/StylesOfInput";
import { format } from "date-fns";

export default (props: hitDataTypeWithDate) => {
  const navigation = useNavigation<EditHitDataOfDateNaviProps>();

  const gotoHitResult = () => {
    console.log("gotoHitResult", props.date, props.hitDataList);
    navigation.navigate("EditHitDataOfDate", {
      date: props.date,
      hitDataList: props.hitDataList,
    });
  };

  const date = new Date(props.date);

  return (
    <TouchableOpacity
      style={hitResultByDateStyles.container}
      onPress={gotoHitResult}
    >
      <View style={hitResultByDateStyles.dateView}>
        <Text style={hitResultByDateStyles.text}>{format(date, "M月d日")}</Text>
      </View>
      <View style={hitResultByDateStyles.dataView}>
        <Text style={hitResultByDateStyles.text}>
          {getNumberOfShots(props.hitDataList)}射
          {getNumberOfHits(props.hitDataList)}中
        </Text>
        <Text style={hitResultByDateStyles.text}>
          的中率{"  "}
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
