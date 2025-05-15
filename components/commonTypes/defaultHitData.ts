import { HitDataType, HitDataType2, hitDataTypeWithDate } from "./types";

const defaultHitData: HitDataType = {
  date: new Date().toLocaleDateString(),
  time: new Date().toLocaleTimeString(),
  first: true,
  second: null,
  third: null,
  fourth: null,
};

export const defaultHitData2: HitDataType2 = {
  id: 0,
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  date: new Date().getDate(),
  time: new Date().toLocaleTimeString(),
  first: 1,
  second: 1,
  third: 1,
  fourth: 0,
  positionId: null,
  placeId: null,
};

export const sampleHitDataList: hitDataTypeWithDate[] = [
  {
    date: "2023/11/1",
    hitDataList: [
      {
        year: 2023,
        month: 11,
        date: 1,
        time: "12:07",
        first: 1,
        second: 0,
        third: 1,
        fourth: 0,
      },
      {
        year: 2024,
        month: 1,
        date: 1,
        time: "12:00",
        first: 1,
        second: 0,
        third: 1,
        fourth: 1,
      },
    ],
  },
  {
    date: "2024/1/2",
    hitDataList: [
      {
        year: 2024,
        month: 1,
        date: 2,
        time: "12:00",
        first: 0,
        second: 1,
        third: 0,
        fourth: 1,
      },
    ],
  },
];

export const sampleHitData: HitDataType2[] = [
  {
    year: 2023,
    month: 11,
    date: 1,
    time: "12:07",
    first: null,
    second: null,
    third: null,
    fourth: 0,
  },
  {
    year: 2024,
    month: 1,
    date: 1,
    time: "12:00",
    first: null,
    second: null,
    third: null,
    fourth: null,
  },
  {
    year: 2024,
    month: 1,
    date: 2,
    time: "12:00",
    first: 0,
    second: null,
    third: 0,
    fourth: null,
  },
  {
    year: 2025,
    month: 4,
    date: 2,
    time: "12:00",
    first: 0,
    second: 0,
    third: 0,
    fourth: null,
  },
  {
    year: 2024,
    month: 2,
    date: 2,
    time: "12:00",
    first: null,
    second: 0,
    third: 1,
    fourth: 1,
  },
  {
    year: 2024,
    month: 2,
    date: 2,
    time: "12:00",
    first: 0,
    second: 1,
    third: 1,
    fourth: 0,
  },
];

export const createSampleHitData = (): HitDataType2[] => {
    const today = new Date();
    const sampleData: HitDataType2[] = [];
    for (let i = 0; i < 4; i++) {
        sampleData.push({
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            date: today.getDate(),
            time: today.toLocaleTimeString(),
            first: Math.random() > 0.5 ? 1 : 0,
            second: Math.random() > 0.5 ? 1 : 0,
            third: Math.random() > 0.5 ? 1 : 0,
            fourth: Math.random() > 0.5 ? 1 : 0,
        });
    }
    return sampleData;
}

export default defaultHitData;
