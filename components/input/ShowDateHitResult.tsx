import { Text, View, ViewStyle } from "react-native"
import { HitDataType2 } from "../commonTypes/types"
import { hitDataTypeWithDate } from "../database/hitDataControl"
import HitResultBase from "./HitResultBase"


type ShowDateHitDataProps = {
    hitDataList: hitDataTypeWithDate
}

export default (props: ShowDateHitDataProps) => {

    

    return (
        <View>
           <Text>{props.hitDataList.date}</Text>
           <View>
                {props.hitDataList.hitDataList.map((hitData: HitDataType2, index: number) => {
                    return (
                        <HitResultBase first={hitData.first} second={hitData.second} third={hitData.third} fourth={hitData.fourth} key={index} />
                    )
                })}
           </View>
        </View>
    )
}
