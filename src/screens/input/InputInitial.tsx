import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import * as SQLite from "expo-sqlite";
import { defaultHitData2 } from "../../types/defaultHitData";
import { HitDataType2 } from "../../types/input/HitDataType2";

export default () => {
  const [allHitDataList, setAllHitDataList] = useState<HitDataType2[]>([
    defaultHitData2,
  ]);

  useEffect(() => {
    const getAllHitData = async () => {
      try {
        const db = await SQLite.openDatabaseAsync("test.db"); // await無いとexecAsyncが出てこない
        db.execAsync(`PRAGMA journal_mode = WAL;`);

        const datas: HitDataType2[] = await db.getAllAsync(
          "SELECT * FROM hitdata_test_table"
        );
        if (datas.length > 1) {
          setAllHitDataList(datas);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getAllHitData();
  }, []);

  return <ScrollView></ScrollView>;
};
