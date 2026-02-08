import { Text, TouchableOpacity, View } from "react-native";
import { getPosition } from "../../utils/getPosition";
import { AddDataAreaStyles } from "../../styles/input/StylesOfInput";
import { useRef } from "react";
import ModalDropdown from "react-native-modal-dropdown";
import AddPositionDropdown from "./AddPositionDropdown";

type AddPositionProps = {
  position: number;
  setPosition: (position: number) => void;
};

export default (props: AddPositionProps) => {

  const dropdownRef = useRef<ModalDropdown>(null);

  const positionDropdownOpen = () => {
    dropdownRef.current?.show();
  };

  return (
    <View>
      <TouchableOpacity style={AddDataAreaStyles.addItem} onPress={positionDropdownOpen}>
        <Text style={AddDataAreaStyles.addItemText}>立ち位置</Text>
        <Text style={AddDataAreaStyles.addItemText}>{getPosition(props.position)}</Text>
      </TouchableOpacity>
      <AddPositionDropdown
        ref={dropdownRef}
        position={props.position}
        setPosition={props.setPosition}
      />
    </View>
  );
};
