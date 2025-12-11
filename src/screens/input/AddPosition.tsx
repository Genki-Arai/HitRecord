import { Text, TouchableOpacity, View } from "react-native";
import { getPosition } from "../../utils/getPosition";
import { AddDataAreaStyles } from "../../styles/input/StylesOfInput";

type AddPositionProps = {
  position: number;
  setPosition?: (position: number) => void;
};

export default (props: AddPositionProps) => {
  return (
    <View>
      <TouchableOpacity style={AddDataAreaStyles.addItem}>
        <Text style={AddDataAreaStyles.addItemText}>立ち位置</Text>
        <Text style={AddDataAreaStyles.addItemText}>{getPosition(props.position)}</Text>
      </TouchableOpacity>
    </View>
  );
};
