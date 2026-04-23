import { createStackNavigator } from "@react-navigation/stack";
import { EditHitDataOfDate } from "../screens/input/EditHitDataOfDate";
import InputMain from "../screens/input/InputScreen";
import { RootStackParamList } from "../types/input/navigationTypes";
import { InputContext } from "../screens/input/InputContext";
import { useEffect, useState } from "react";
import { HitDataType2 } from "../types/input/HitDataType2";
import { getAllHitData } from "../utils/database/selectHitData";
import SampleBottomSheetScreen from "../components/practice/SampleBottomSheetScreen";
import GDetailScreen from "../components/practice/geminiScreen/GDetailScreen";
import GDetailScreen2 from "../components/practice/geminiScreen/GDetailScreen2";
import GRNGHSample from "../components/practice/geminiScreen/GRNGHSample";
import GDetailScreen3 from "../components/practice/geminiScreen/GDetailScreen3";
import InputDataScreen from "../screens/input/InputDataScreen";

export default () => {
  const Stack = createStackNavigator<RootStackParamList>();
  const [allHitDataList, setAllHitDataList] = useState<HitDataType2[]>([]);

  useEffect(() => {
    (async () => {
      const dataList: HitDataType2[] = await getAllHitData();
      if (!dataList) {
        console.error("Failed to fetch hit data.");
        return;
      }
      setAllHitDataList(dataList);
    })();
  }, []);

  return (
    <InputContext.Provider value={{ allHitDataList, setAllHitDataList }}>
      <Stack.Navigator
        initialRouteName="InputMain"
        screenOptions={{ headerShown: false }} // trueだとヘッダー(タイトルバー)を表示する
      >
        <Stack.Screen name="InputMain" component={InputDataScreen} />
        {/* <Stack.Screen name="InputMain" component={InputDataScreen } /> */}
        {/* <Stack.Screen name="InputMain" component={InputMain} /> */}
        <Stack.Screen name="EditHitDataOfDate" component={EditHitDataOfDate} />
      </Stack.Navigator>
      {/* <SampleBottomSheetScreen /> */}
    </InputContext.Provider>
  );
};
