

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

export type HitType = boolean | null;