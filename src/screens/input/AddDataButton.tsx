import { Text, TouchableOpacity, ViewStyle } from "react-native";
import { HitRecordColors } from "../../styles/constants/colors/HitRecordColors";
import { useNavigation } from "@react-navigation/native";
import { InputDataScreenNaviProps } from "../../types/input/navigationTypes";

export default ({
  addDataBottomSheetOpen,
}: {
  addDataBottomSheetOpen: () => void;
}) => {

    const navigation = useNavigation<InputDataScreenNaviProps>();
  
    const gotoInputDataScreen = () => {
      console.log("gotoInputHitData");
      navigation.navigate({name: "InputHitData", params: {}});
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
