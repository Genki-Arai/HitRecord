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
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { HitDataType } from "../commonTypes/types";
import defaultHitData from "../commonTypes/defaultHitData";
import * as SQLite from 'expo-sqlite';

export default function InputScreen() {
    const [dataList, setDataList] = useState<HitDataType[]>([]);
    const [dataNum, setDataNum] = useState<number>(dataList.length);

  const addDataNum = () => {
    setDataNum(dataNum + 1);
  }

  const subtractDataNum = () => {
    if(confirm('本当に削除しますか？')){
        
    }
  }
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
            const db = await SQLite.openDatabaseAsync('test.db');
            await db.execAsync(`PRAGMA journal_mode = WAL;`);
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS hit_test_data (
                id INTEGER PRIMARY KEY AUTOINCREMENT
                , date TEXT NOT NULL
                , time TEXT NOT NULL
                , first BOOLEAN DEFAULT NULL
                , second BOOLEAN DEFAULT NULL
                , third BOOLEAN DEFAULT NULL
                , fourth BOOLEAN DEFAULT NULL
                )`);
            const rows: HitDataType[] = await db.getAllAsync('SELECT * FROM position');
            console.log('rows:', rows);

                // -------------------
                
                console.log('positionList:', await db.execAsync(`
                    SELECT * FROM position
                `))
               
                console.log('sqliteMaster:', await db.execAsync(`
                    SELECT * FROM sqlite_master
                `))
                // ----------------------

            if(rows.length === 0) {
                setDataList([defaultHitData]);
            } else {
                setDataList(rows);
            }
        } catch (error) {
            console.error('Transaction Error:', error);
        }
    }
    insertData();
  }, []);

// ---------------------------------------------


  return (
    <ScrollView>
      <Text>インプット画面</Text>

      {(function () {
        const hitResultBaseList = [];
        for (let i = 0; i < dataNum; i++) {
            // first={dataList[i].first}から変更している（現状）
          hitResultBaseList.push(<InputHitBase key={i} first={true} />);
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
