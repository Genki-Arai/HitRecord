

export type HitResultType = {
    isHit: boolean | null;
}

export type HitDataType = {
    date: string;
    time: string;
    first: HitType;
    second: HitType;
    third: HitType;
    fourth: HitType;
}

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

export type HitType = boolean | null;
export type HitType2 = 1 | 0 | null;