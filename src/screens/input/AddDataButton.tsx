import { Text, TouchableOpacity, ViewStyle } from "react-native";
import { HitRecordColors } from "../../styles/constants/colors/HitRecordColors";
import { useNavigation } from "@react-navigation/native";
import {  RecordNaviProps } from "../../types/input/navigationTypes";

export default ({
  addDataBottomSheetOpen,
}: {
  addDataBottomSheetOpen: () => void;
}) => {

    const navigation = useNavigation<RecordNaviProps>();
    
    const gotoInputDataScreen = () => {
      console.log("gotoRecordScreen");
      navigation.navigate("Record");
    };

  return (
    <TouchableOpacity
      style={addDataButtonStyles}
      onPress={gotoInputDataScreen}
      // onPress={addDataBottomSheetOpen}
    >
      <Text>追加</Text>
    </TouchableOpacity>
  );
};

const addDataButtonStyles: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  padding: 10,
  backgroundColor: HitRecordColors.gray,
  width: "auto",
};
