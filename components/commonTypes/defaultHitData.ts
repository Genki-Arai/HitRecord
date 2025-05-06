import { HitDataType } from "./types";

const defaultHitData: HitDataType = {
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    first: true,
    second: null,
    third: null, 
    fourth: null,
}

export default defaultHitData