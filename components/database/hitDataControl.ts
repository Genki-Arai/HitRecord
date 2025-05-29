import { openDatabaseAsync } from "expo-sqlite";
import { createSampleHitData } from "../../types/defaultHitData";
import { HitDataType2 } from "../../types/input/HitDataType2";
import { hitDataTypeWithDate } from "../../types/input/hitDataTypeWithDate";
import { hitDataTypeWithMonth } from "../../types/input/hitDataTypeWithMonth";

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

/**
 * 的中データを全て取得する
 * @returns {Promise<HitDataType2[]>} 的中データの配列
 */
export const getAllHitData = async () => {
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
  }
};

/**
 * 的中データから年月日を取得する（重複なし）
 * @param hitDataList 的中データの配列
 * @returns 'yyyy/mm/dd'形式の年月日の配列
 */
export const pickOutDate = (hitDataList: HitDataType2[]): string[] => {
  return [
    ...new Set(
      hitDataList.map(
        (hitdata) => `${hitdata.month}/${hitdata.date}`
      )
    ),
  ];
};

/**
 * 的中データを日付ごとにまとめる
 * @param hitDataList 的中データの配列
 * @returns 日付ごとにまとめた的中データの配列
 */
export const sortByDate = (
  hitDataList: HitDataType2[]
): hitDataTypeWithDate[] => {
  const dateList = pickOutDate(hitDataList);
  const newHitDataList: hitDataTypeWithDate[] = [];
  for (const date of dateList) {
    newHitDataList.push({
      date: date,
      hitDataList: [],
    });
    hitDataList.forEach((hitdata) => {
      if (`${hitdata.month}/${hitdata.date}` == date) {
        newHitDataList[newHitDataList.length - 1].hitDataList.push(hitdata);
      }
    });
  }
  console.log("newHitDataList:", newHitDataList);
  return newHitDataList;
};

/**
 * 的中データを月ごとにまとめる
 * @param hitDataList 的中データの配列
 * @returns 月ごとにまとめた的中データの配列
 */
export const sortByMonth = (
  hitDataList: HitDataType2[]
): hitDataTypeWithMonth[] => {
  const monthList = [
    ...new Set(
      hitDataList.map((hitdata) => `${hitdata.year}年${hitdata.month}月`)
    ),
  ];
  const newHitDataList: hitDataTypeWithMonth[] = [];
  for (const month of monthList) {
    newHitDataList.push({
      month: month,
      hitDataList: [],
    });
    hitDataList.forEach((hitdata) => {
      if (`${hitdata.year}年${hitdata.month}月` == month) {
        newHitDataList[newHitDataList.length - 1].hitDataList.push(hitdata);
      }
    });
  }
  console.log("newHitDataList:", newHitDataList);
  return newHitDataList;
};
