import { HitDataType2 } from "../../types/input/HitDataType2";

/**
 * 
 * @param hitData 1立分の的中記録の配列
 * @returns 引数の的中記録の総数
 */
export const getNumberOfShots = (hitData: HitDataType2[]): number => {
  let numberOfShots = 0;
  hitData.forEach((hitData: HitDataType2) => {
    if (hitData.first == 1 || hitData.first == 0) numberOfShots++; // hitData.first !== nullの方が良いかも
    if (hitData.second == 1 || hitData.second == 0) numberOfShots++;
    if (hitData.third == 1 || hitData.third == 0) numberOfShots++;
    if (hitData.fourth == 1 || hitData.fourth == 0) numberOfShots++;
  });
  return numberOfShots;
};

/**
 * 
 * @param hitData 1立分の的中記録の配列
 * @returns 引数の的中記録の的中数
 */
export const getNumberOfHits = (hitData: HitDataType2[]): number => {
  let numberOfHits = 0;
  hitData.forEach((hitData: HitDataType2) => {
    if (hitData.first) numberOfHits++;
    if (hitData.second) numberOfHits++;
    if (hitData.third) numberOfHits++;
    if (hitData.fourth) numberOfHits++;
  });
  return numberOfHits;
};
