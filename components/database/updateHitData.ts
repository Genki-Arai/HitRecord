import { openDatabaseAsync } from "expo-sqlite";
import { HitDataType2 } from "../../types/input/HitDataType2";
import { HitType2 } from "../../types/input/hitType2";
import { HitType } from "../../types/input/HitDataType";



export const updateHitData = async (id: number, first: HitType2, second: HitType2, third: HitType2, fourth: HitType2) => {
  try {
    const db = await openDatabaseAsync("test.db");
    await db.execAsync(`PRAGMA journal_mode = WAL;`);

    // Update the hit data
    const result = await db.execAsync(
      `UPDATE hitdata_test_table SET        
        first = ${first}, 
        second = ${second}, 
        third = ${third}, 
        fourth = ${fourth} 
      WHERE id = ${id}`,
    );

    // if (result.rowsAffected > 0) {
    //   console.log("Hit data updated successfully.");
    // } else {
    //   console.log("No rows were updated. Check if the ID exists.");
    // }
    console.log("Hit data updated successfully:", result);
  } catch (error) {
    console.error("Error updating hit data:", error);
  }
}