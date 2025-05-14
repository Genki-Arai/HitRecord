import { ReactElement, useEffect, useState } from "react";
import { HitDataType, HitDataType2 } from "../commonTypes/types";
import HitResultBase from "./HitResultBase";
import { ScrollView, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { openDatabaseAsync } from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import defaultHitData, { defaultHitData2, sampleHitData, sampleHitDataList } from "../commonTypes/defaultHitData";
import { hitDataTypeWithDate, insertSampleHitData2, sortByDate } from "../database/hitDataControl";
import ShowDateHitResult from "./ShowDateHitResult";

export default () => {

    const [allHitDataList, setAllHitDataList] = useState<hitDataTypeWithDate[]>(sampleHitDataList);

    useEffect(() => {
        const getAllHitData = async () => {
            try {
                const db = await SQLite.openDatabaseAsync("test.db"); // await無いとexecAsyncが出てこない
                db.execAsync(`PRAGMA journal_mode = WAL;`);
                
                const datas: HitDataType2[] = await db.getAllAsync(
                    "SELECT * FROM hitdata_test_table ORDER BY year DESC, month DESC, date DESC"
                );
                if (datas.length > 1) {
                    setAllHitDataList(sortByDate(datas));
                }
            } catch (error) {
                console.error(error);
            }
        };

        getAllHitData();
    }, []);

    

    return (
        <ScrollView style={styles.container}>
            {function () {
                const hitDataList: ReactElement[] = [];
                allHitDataList.forEach((hitData: hitDataTypeWithDate, index: number) => {
                    hitDataList.push(
                        <ShowDateHitResult hitDataList={hitData} key={index} />
                    )
                })
                
                return hitDataList;
            }()}
            <TouchableOpacity onPress={() => insertSampleHitData2(sampleHitData)}>
                <Text style={{ fontSize: 20, textAlign: "center", marginVertical: 10 }}>データを追加</Text>
            </TouchableOpacity>
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