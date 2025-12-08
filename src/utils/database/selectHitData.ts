import { openDatabaseAsync } from "expo-sqlite";
import { HitDataType2 } from "../../../types/input/HitDataType2";
import { createSampleHitData } from "../../../types/defaultHitData";

/**
 * 的中データを全て取得する
 * @returns {Promise<HitDataType2[]>} 的中データの配列
 */
export const getAllHitData = async (): Promise<HitDataType2[]> => {
  try {
    const db = await openDatabaseAsync("test.db");
    db.execAsync(`PRAGMA journal_mode = WAL;`);

    const datas: HitDataType2[] = await db.getAllAsync(
      "SELECT * FROM hitdata_test_table ORDER BY year DESC, month DESC, date DESC"
    );
    if (datas.length > 1) {
      return datas;
    }
    return createSampleHitData();
  } catch (error) {
    console.error(error);
    return [];
  }
};
