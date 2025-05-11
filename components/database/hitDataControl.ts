import { openDatabaseAsync } from "expo-sqlite";
import { HitDataType } from "../commonTypes/types";

export const insertSampleHitData = async (hitData: HitDataType[]) => {
  try {
    const db = await openDatabaseAsync("test.db");
    await db.execAsync(`PRAGMA journal_mode = WAL;`);

    // Check if the table exists
    const result: any = await db.getAllAsync(`
        SELECT * FROM sqlite_master WHERE type='table' AND name='hit_test_data'
        `);

    if (result.length > 0) {
      // Table exists, insert data
      for (const data of hitData) {
        await db.execAsync(
          `INSERT INTO hit_test_data (date, time, first, second, third, fourth) VALUES (${data.date}, ${data.time}, ${data.first}, ${data.second}, ${data.third}, ${data.fourth})`
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
