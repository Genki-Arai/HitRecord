import { useNavigation } from "@react-navigation/native";
import { openDatabaseAsync } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import * as SQLite from "expo-sqlite";

export default () => {
  const [isSetting, setIsSetting] = useState<boolean>(true);
  const navigation = useNavigation<any>();

  

  useEffect(() => {
    async function createHitTestDataTable() {
      try {
        const db = await SQLite.openDatabaseAsync("test.db");
        await db.execAsync(`PRAGMA journal_mode = WAL;`);
        async function isExistsTable(tableName: string): Promise<boolean> {
          const result: any = await db.getAllAsync(`
                    SELECT * FROM sqlite_master WHERE type='table' AND name='${tableName}'
                    `);
          return result.length > 0;
        }
        if(!await isExistsTable("hitdata_test_table")) {
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS hitdata_test_table (
                id INTEGER PRIMARY KEY AUTOINCREMENT
                , year INTEGER NOT NULL
                , month INTEGER NOT NULL
                , date INTEGER NOT NULL
                , time TEXT NOT NULL
                , first BOOLEAN DEFAULT NULL
                , second BOOLEAN DEFAULT NULL
                , third BOOLEAN DEFAULT NULL
                , fourth BOOLEAN DEFAULT NULL
                , position_id INTEGER DEFAULT NULL
                , place_id INTEGER DEFAULT NULL
                )`);
            console.log("Hit data test table created.");
        } else {
            console.log("Hit data test table already exists.");
        }

        if (!await isExistsTable("position")) {
          await db.execAsync(`
                CREATE TABLE IF NOT EXISTS position (
                id INTEGER PRIMARY KEY
                , position TEXT NOT NULL
                );`);

          console.log("Position table created.");

          await db.execAsync(`
                INSERT INTO position (id, position) VALUES (1, '大前'), (2, '二的'), (3, '中'), (4, '落前'), (5, '落')
            `)
        } else{
            console.log("Position table already exists.");
        }


        setTimeout(() => {
          setIsSetting(false);
          navigation.navigate("Auth");
          db.closeAsync();
        }, 500);
      } catch (e) {
        console.error("Error initial setup:", e);
      }
    }

    createHitTestDataTable();
  }, []);

  if (isSetting) {
    return (
      <View style={styles.initialSetupContainer}>
        <View style={styles.initialSetupArea}>
          <Text style={styles.initialSetupText}>準備中...</Text>
          <ActivityIndicator size={"large"} color={"white"} />
        </View>
      </View>
    );
  }

  return null;
};

type InitialSetupStyle = {
  initialSetupContainer: ViewStyle;
  initialSetupArea: ViewStyle;
  initialSetupText: TextStyle;
};

const styles: InitialSetupStyle = {
  initialSetupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  initialSetupText: {
    fontSize: 20,
    color: "#f7fcfe",
    marginBottom: 10,
  },
  initialSetupArea: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#474a4d",
    borderRadius: 20,
    padding: 20,
  },
};
