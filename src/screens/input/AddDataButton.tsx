import { Text, TouchableOpacity, ViewStyle } from "react-native";
import { HitRecordColors } from "../../styles/constants/colors/HitRecordColors";

export default ({
  addDataBottomSheetOpen,
}: {
  addDataBottomSheetOpen: () => void;
}) => {
  return (
    <TouchableOpacity
      style={addDataButtonStyles}
      onPress={addDataBottomSheetOpen}
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
