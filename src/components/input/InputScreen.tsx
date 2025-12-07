import { useNavigation } from "@react-navigation/native";
import {
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import HitResultBase from "./HitResultBase";
import { ReactElement, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import defaultHitData, { defaultHitData2 } from "../../../types/defaultHitData";
import * as SQLite from "expo-sqlite";
import { HitDataType } from "../../../types/input/HitDataType";

export default function InputScreen() {
  const [dataList, setDataList] = useState<any[]>([]);
  const [dataNum, setDataNum] = useState<number>(dataList.length);

  console.log(new Date().getTime().toString());

  const addDataNum = () => {
    setDataNum(dataNum + 1);
  };

  const subtractDataNum = () => {
    if (confirm("本当に削除しますか？")) {
    }
  };
  // -----------DBテスト--------------------------
  useEffect(() => {
    async function insertData() {
      try {
        const db = await SQLite.openDatabaseAsync("test.db");
        await db.execAsync(`PRAGMA journal_mode = WAL;`);

        const rows: HitDataType[] = await db.getAllAsync(
          "SELECT * FROM hit_test_data"
        );
        console.log("rows length:", rows.length);
        if (rows.length === 0) {
          setDataList([defaultHitData2]);
        } else {
          setDataList(rows);
        }
      } catch (error) {
        console.error("Transaction Error:", error);
      }
    }
    insertData();
  }, []);

  // ---------------------------------------------

  return (
    <ScrollView>
      <Text>インプット画面</Text>

      {(function () {
        const hitResultBaseList: ReactElement[] = [];
        // for (let i = 0; i < dataNum; i++) {
        //   // first={dataList[i].first}から変更している（現状）
        //   hitResultBaseList.push(<HitResultBase key={i} first={true} />);
        // }
        dataList.forEach((data, index) => {
          hitResultBaseList.push(
            <HitResultBase
              key={index}
              first={data.first}
              second={data.second}
              third={data.third}
              fourth={data.fourth}
            />
          );
        });
        return hitResultBaseList;
      })()}

      <TouchableOpacity
        onPress={() => setDataNum(dataNum + 1)}
        style={styles.addButton}
      >
        <Ionicons name="add" size={24} color="black" />
      </TouchableOpacity>
      {/* <TouchableOpacity style={{backgroundColor: '#38a1db'}} onPress={() => insertSampleHitData(sampleHitData)}>
        <Text>サンプルデータを挿入</Text>
      </TouchableOpacity> */}
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
