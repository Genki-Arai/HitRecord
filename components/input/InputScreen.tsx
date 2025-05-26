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
import { HitDataType } from "../commonTypes/types";
import defaultHitData from "../commonTypes/defaultHitData";
import * as SQLite from "expo-sqlite";

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
    // async function insertData() {
    //     const db = SQLite.openDatabaseAsync('test.db');

    //     try {
    //         await (await db).withTransactionAsync(async (tx) => {
    //             await tx.executeSqlAsync('PRAGMA journal_mode = WAL;');
    //             await tx.executeSqlAsync('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOTNULL');
    //             await tx.executeSqlAsync('INSERT INTO test (name) VALUES (?)', ['test name 1']);
    //             await tx.executeSqlAsync('INSERT INTO test (name) VALUES (?)', ['test name 2']);
    //         })
    //         const rows = (await db).getAllAsync('SELECT * FROM test');
    //         console.log('rows:', rows);
    //     } catch (error) {
    //         console.error('Transaction Error:', error);
    //     }
    // }
    // insertData();
    async function insertData() {
      try {
        const db = await SQLite.openDatabaseAsync("test.db");
        await db.execAsync(`PRAGMA journal_mode = WAL;`);

        const rows: HitDataType[] = await db.getAllAsync(
          "SELECT * FROM hit_test_data"
        );
        console.log("rows length:", rows.length);
        if (rows.length === 0) {
          setDataList([defaultHitData]);
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
  const sampleHitData: HitDataType[] = [
    {
      date: new Date().getDate().toString(),
      time: new Date().getTime().toString(),
      first: true,
      second: false,
      third: true,
      fourth: false,
    },
    {
      date: new Date(2025,1,31).getDate().toString(),
      time: new Date().getTime().toString(),
      first: true,
      second: true,
      third: true,
      fourth: true,
    },
    {
      date: new Date(2025,1,31).getDate().toString(),
      time: new Date().getTime().toString(),
      first: true,
      second: true,
      third: true,
      fourth: false,
    },
    {
      date: new Date().getDate().toString(),
      time: new Date().getTime().toString(),
      first: false,
      second: false,
      third: true,
      fourth: false,
    },
  ]

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
          )
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
