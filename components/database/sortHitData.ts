import { HitDataType2 } from "../../types/input/HitDataType2";
import { hitDataTypeWithDate } from "../../types/input/hitDataTypeWithDate";
import { hitDataTypeWithMonth } from "../../types/input/hitDataTypeWithMonth";

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
