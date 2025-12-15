import { HitType2 } from "./hitType2";


export type HitDataType2 = {
    id?: number;
    year: number;
    month: number;
    date: number;
    time: string;
    first: HitType2;
    second: HitType2;
    third: HitType2;
    fourth: HitType2;
    positionId?: number | null;
    placeId?: number | null;
}