import { ReactElement } from "react";
import { HitDataType } from "../commonTypes/types";
import HitResultBase from "./HitResultBase";
import { View } from "react-native";

type InputMainProps = {
    hitDataList: HitDataType[];
}

export default (props: InputMainProps) => {

    const dateList: string[] = props.hitDataList ? [...new Set(props.hitDataList.map((hitdata) => hitdata.date))] : [];

    return (
        <View style={{ backgroundColor: 'lightyellow' }}>
            {function () {
                console.log("dateList", dateList);
                console.log("hitDataList", props.hitDataList);
                const hitDataList: ReactElement[] = [];
                dateList.forEach((date, dateIndex) => {
                    props.hitDataList.forEach((hitdata, hitdataIndex) => {
                        if(hitdata.date == date) {
                            hitDataList.push(
                                <HitResultBase
                                    key={`${dateIndex}-${hitdataIndex}`}
                                    first={hitdata.first}
                                    second={hitdata.second}
                                    third={hitdata.third}
                                    fourth={hitdata.fourth}
                                />
                            )
                        }
                    })
                })
                return hitDataList;
            }()}
            
        </View>
    )
}