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

export default () => {
  const [isSetting, setIsSetting] = useState<boolean>(true);
  const navigation = useNavigation<any>();

  useEffect(() => {
    async function createHitTestDataTable() {
      try {
        const db = await openDatabaseAsync("test.db");
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

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#474a4d',
    borderRadius: 20,
    padding: 20,
  }
};
