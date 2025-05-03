import { useNavigation } from "@react-navigation/native";
import {
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import InputHitBase from "./HitResultBase";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { HitDataType } from "../commonTypes/types";
import defaultHitData from "../commonTypes/defaultHitData";

export default function InputScreen() {
    const [dataList, setDataList] = useState<HitDataType[]>([defaultHitData, defaultHitData, defaultHitData]);
    const [dataNum, setDataNum] = useState<number>(dataList.length);

  const addDataNum = () => {
    setDataNum(dataNum + 1);
  }

  const subtractDataNum = () => {
    if(confirm('本当に削除しますか？')){
        
    }
  }

  return (
    <ScrollView>
      <Text>インプット画面</Text>

      {(function () {
        const hitResultBaseList = [];
        for (let i = 0; i < dataNum; i++) {
          hitResultBaseList.push(<InputHitBase key={i} first={dataList[i].first} />);
        }
        return hitResultBaseList;
      })()}
      <TouchableOpacity
        onPress={() => setDataNum(dataNum + 1)}
        style={styles.addButton}
      >
        <Ionicons name="add" size={24} color="black" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles: { addButton: ViewStyle } = {
  addButton: {
    backgroundColor: "#ffd900",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: "auto",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
};
