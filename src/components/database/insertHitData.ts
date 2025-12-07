import { openDatabaseAsync } from "expo-sqlite";
import { HitDataType2 } from "../../../types/input/HitDataType2";

/**
 * 的中データを追加する
 * @param hitData 年、月、日、時間、的中データの配列
 */
export const insertSampleHitData = async (hitData: HitDataType2[]) => {
  try {
    const db = await openDatabaseAsync("test.db");
    await db.execAsync(`PRAGMA journal_mode = WAL;`);

    // Check if the table exists
    const result: any = await db.getAllAsync(`
        SELECT * FROM sqlite_master WHERE type='table' AND name='hitdata_test_table'
        `);

    if (result.length > 0) {
      // Table exists, insert data
      for (const data of hitData) {
        await db.execAsync(
          `INSERT INTO hitdata_test_table (year, month, date, time, first, second, third, fourth) VALUES (${data.year}, ${data.month}, ${data.date}, '${data.time}', ${data.first}, ${data.second}, ${data.third}, ${data.fourth})`
        );
      }
      console.log("Sample hit data inserted.");
    } else {
      console.log("Table does not exist.");
    }
  } catch (error) {
    console.error("Error inserting sample hit data:", error);
  }
};
