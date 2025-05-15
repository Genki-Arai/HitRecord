import { openDatabaseAsync } from "expo-sqlite";
import {
  HitDataType,
  HitDataType2,
  hitDataTypeWithDate,
  hitDataTypeWithMonth,
  HitType2,
} from "../commonTypes/types";
import { createSampleHitData } from "../commonTypes/defaultHitData";

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

export const insertSampleHitData2 = async (hitData: HitDataType2[]) => {
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

export const pickOutDate = (hitDataList: HitDataType2[]): string[] => {
  return [
    ...new Set(
      hitDataList.map(
        (hitdata) => `${hitdata.year}/${hitdata.month}/${hitdata.date}`
      )
    ),
  ];
};

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
      if (`${hitdata.year}/${hitdata.month}/${hitdata.date}` == date) {
        newHitDataList[newHitDataList.length - 1].hitDataList.push(hitdata);
      }
    });
  }
  console.log("newHitDataList:", newHitDataList);
  return newHitDataList;
};

export const sortByMonth = (hitDataList: HitDataType2[]): hitDataTypeWithMonth[] => {
  const monthList = [
    ...new Set(
      hitDataList.map((hitdata) => `${hitdata.year}/${hitdata.month}`)
    ),
  ];
  const newHitDataList: hitDataTypeWithMonth[] = [];
  for (const month of monthList) {
    newHitDataList.push({
      month: month,
      hitDataList: [],
    });
    hitDataList.forEach((hitdata) => {
      if (`${hitdata.year}/${hitdata.month}` == month) {
        newHitDataList[newHitDataList.length - 1].hitDataList.push(hitdata);
      }
    });
  }
  console.log("newHitDataList:", newHitDataList);
  return newHitDataList;
};
