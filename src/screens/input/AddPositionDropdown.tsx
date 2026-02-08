import { forwardRef, useRef } from "react";
import { Text, View } from "react-native";
import ModalDropdown from "react-native-modal-dropdown"
import { getPosition } from "../../utils/getPosition";

type AddPositionDropdownProps = {
    position: number;
    setPosition: (position: number) => void;
};

export default forwardRef<ModalDropdown, AddPositionDropdownProps>((props, ref) => {
    
    const positionData = [1, 2, 3, 4, 5];

    const closeDropdown = () => {
        ref && (ref as React.RefObject<ModalDropdown>).current?.hide();
    }

    const onSelect = (index: string, value: string) => {
        const numIndex = parseInt(index, 10);
        props.setPosition(positionData[numIndex]);
        console.log(`選択されたインデックス: ${index}, 値: ${value}`);
    };

    return (
        <ModalDropdown 
        ref={ref}
        options={positionData.map(String)}
        onSelect={onSelect}

        defaultIndex={-1}
        dropdownStyle={{ width: "100%", height: 'auto' }}
        textStyle={{ fontSize: 0 }} // テキストも表示されないように

        renderRow={(option: string, index: string, isSelected: boolean) => (
          <View style={{ padding: 10 }} key={option}
        //   style={[styles.dropdownRow, isSelected && { backgroundColor: '#ddd' }]}
          >
            <Text 
            
            // style={styles.dropdownRowText}
            >{getPosition(parseInt(option, 10))}</Text>
          </View>
        )}
        />
    )
});