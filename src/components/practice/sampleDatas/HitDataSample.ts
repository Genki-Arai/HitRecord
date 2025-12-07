import { HitDataType } from "../../../../types/input/HitDataType";

const sampleHitData: HitDataType[] = [
  {
    date: new Date().getDate().toString(),
    time: new Date().getTime().toString(),
    first: true,
    second: false,
    third: true,
    fourth: false,
  },
  {
    date: new Date(2025, 1, 31).getDate().toString(),
    time: new Date().getTime().toString(),
    first: true,
    second: true,
    third: true,
    fourth: true,
  },
  {
    date: new Date(2025, 1, 31).getDate().toString(),
    time: new Date().getTime().toString(),
    first: true,
    second: true,
    third: true,
    fourth: false,
  },
  {
    date: new Date().getDate().toString(),
    time: new Date().getTime().toString(),
    first: false,
    second: false,
    third: true,
    fourth: false,
  },
];
