import { ReactElement, useEffect, useState } from "react";
import { HitDataType, HitDataType2, hitDataTypeWithDate, hitDataTypeWithMonth } from "../commonTypes/types";
import HitResultBase from "./HitResultBase";
import { ScrollView, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { openDatabaseAsync } from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import defaultHitData, { defaultHitData2, sampleHitData, sampleHitDataList } from "../commonTypes/defaultHitData";
import { getAllHitData, sortByDate, sortByMonth } from "../database/hitDataControl";
import HitResultByDate from "./HitResultByDate";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import HitResultByMonth from "./HitResultByMonth";

export default () => {

    const [allHitDataList, setAllHitDataList] = useState<hitDataTypeWithMonth[]>([]);

    useEffect(() => {
        (async () => {
            const dataList = await getAllHitData();
            if (dataList) {
                const dataListByMonth = sortByMonth(dataList)
                setAllHitDataList(dataListByMonth);
            }
        })();
    }, []);

    

    return (
        <ScrollView style={styles.container}>
            {function () {
                const hitDataList: ReactElement[] = [];
                allHitDataList.forEach((hitData: hitDataTypeWithMonth, index: number) => {
                    hitDataList.push(
                        <HitResultByMonth month={hitData.month} hitDataList={hitData.hitDataList} key={index} />
                    )
                })
                
                return hitDataList;
            }()}
            
        </ScrollView>
    )
}

type InputMainStyle = {
    container: ViewStyle;
}

const styles: InputMainStyle = {
    container: {
        flex: 1,
        backgroundColor: "lightyellow",
        width: "100%",
    }
}