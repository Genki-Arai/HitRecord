import React, { ReactElement } from "react";
import { HitDataType2 } from "../commonTypes/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { View } from "react-native";
import HitResultBase from "./HitResultBase";

export type RootStackParamList = {
    InputMain: undefined;
    HitResultBase: {
        date: string;
        hitDataList: HitDataType2[];
    };
    HitResultByDate: {
        date: string;
        hitDataList: HitDataType2[];
    };
    EditHitDataOfDate: {
        date: string;
        hitDataList: HitDataType2[];
    }
}

type EditHitDataOfDateRouteProps = RouteProp<RootStackParamList, 'EditHitDataOfDate'>;
type EditHitDataOfDateNaviProps = StackNavigationProp<RootStackParamList, 'EditHitDataOfDate'>;
interface EditHitDataOfDateProps {
    route: EditHitDataOfDateRouteProps;
    navigation: EditHitDataOfDateNaviProps;
}

export const EditHitDataOfDate: React.FC<EditHitDataOfDateProps> = () => {
    const editHitDataOfDateRoute = useRoute<EditHitDataOfDateRouteProps>();
    
    
    const { date, hitDataList } = editHitDataOfDateRoute.params;

    return (
        <View>
            {(function () {
                const hitDatas: ReactElement[] = [];
                hitDataList.forEach((hitData: HitDataType2, index: number) => {
                    hitDatas.push(
                        <HitResultBase
                            key={index}
                            first={hitData.first}
                            second={hitData.second}
                            third={hitData.third}
                            fourth={hitData.fourth}
                        />
                    );
                })
                return hitDatas;
                }
            )()}
        </View>
    )
}