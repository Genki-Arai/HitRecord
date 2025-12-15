import { Text, TouchableOpacity, View } from "react-native";
import { HitDataTypeSimple } from "../../types/input/HitDataTypeSimple";
import { AddDataAreaStyles } from "../../styles/input/StylesOfInput";

type AddResultProps = {
  result: HitDataTypeSimple;
  setResult?: (result: HitDataTypeSimple) => void;
};

export default (props: AddResultProps) => {
  return (
    <View>
      <TouchableOpacity style={AddDataAreaStyles.addItem}>
        <Text style={AddDataAreaStyles.addItemText}>的中結果</Text>
        <Text style={AddDataAreaStyles.addItemText}>未実装</Text>
      </TouchableOpacity>
    </View>
  );
};
