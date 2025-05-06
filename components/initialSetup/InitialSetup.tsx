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
        console.log('db:', db)
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
        console.log("Hit test data table created or already exists.");

        async function isExistsTable(tableName: string): Promise<boolean> {
          const result: any = await db.getAllAsync(`
                    SELECT * FROM sqlite_master WHERE type='table' AND name='${tableName}'
                    `);

                    console.log('result:', result[1])
                    console.log('tableName:', tableName)
          return result.length > 0;
        }

        const positionTableExists = await isExistsTable("position");
        console.log(positionTableExists)
        if (!positionTableExists) {
          await db.execAsync(`
                CREATE TABLE IF NOT EXISTS position (
                id INTEGER PRIMARY KEY
                , position TEXT NOT NULL
                );`);

          console.log("Position table created or already exists.");

        //   await db.execAsync(`
        //         INSERT INTO position (id, position) VALUES (102, '大前'), (200, '二的'), (300, '中'), (400, '落前'), (500, '落')
        //     `)
            const positionList = await db.getAllAsync(`
                SELECT * FROM position
            `);
            console.log('positionList:', positionList)

        }

        // -----------------
          const sqliteMaster = await db.getAllAsync(
                'SELECT * FROM sqlite_master'
            )
            console.log('sqliteMaster:', sqliteMaster)
        // -----------------

        setTimeout(() => {
          setIsSetting(false);
          navigation.navigate("Input");
        }, 500);
      } catch (e) {
        console.error("Error creating hit test data table:", e);
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
