import { createContext } from "react";
import { HitDataType2 } from "../../types/input/HitDataType2";


interface InputContextType {
    allHitDataList: HitDataType2[];
    setAllHitDataList: (data: HitDataType2[]) => void; 
}

export const InputContext = createContext<InputContextType>({
    allHitDataList: [],
    setAllHitDataList: (data: HitDataType2[]) => {
        console.warn("setAllHitDataList is not implemented");
    }
})