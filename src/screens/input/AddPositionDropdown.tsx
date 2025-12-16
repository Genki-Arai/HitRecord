import { useRef } from "react";
import { Text, View } from "react-native";
import ModalDropdown from "react-native-modal-dropdown"

type DropdownModalPracticeProps = {
    position: number;
    setPosition: (position: number) => void;
};

export default (props: DropdownModalPracticeProps) => {
    const dropdownRef = useRef<ModalDropdown>(null);
    const positionData = [1, 2, 3, 4, 5];

    const showDropdown = () => {
        if (dropdownRef.current) {
            dropdownRef.current.show();
        }
    };

    const onSelect = (index: number, value: string) => {
        props.setPosition(positionData[index]);
        console.log(`選択されたインデックス: ${index}, 値: ${value}`);
    };

    return (
        <ModalDropdown 
        ref={dropdownRef}
        options={positionData.map(String)}
        onSelect={onSelect}

        defaultIndex={-1}

        renderRow={(option: string, index: number, isSelected: boolean) => (
          <View 
        //   style={[styles.dropdownRow, isSelected && { backgroundColor: '#ddd' }]}
          >
            <Text 
            
            // style={styles.dropdownRowText}
            >{option}</Text>
          </View>
        )}
        />
    )
}