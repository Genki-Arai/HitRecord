import { createStackNavigator } from "@react-navigation/stack";
import { EditHitDataOfDate } from "../../screens/input/EditHitDataOfDate";
import InputMain from "../../screens/input/InputScreen";
import { RootStackParamList } from "../../../types/input/navigationTypes";
import { InputContext } from "../../screens/input/InputContext";
import { useEffect, useState } from "react";
import { HitDataType2 } from "../../../types/input/HitDataType2";
import { getAllHitData } from "../../utils/database/selectHitData";
import SampleBottomSheetScreen from "../../components/practice/SampleBottomSheetScreen";

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
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="InputMain" component={InputMain} />
        <Stack.Screen name="EditHitDataOfDate" component={EditHitDataOfDate} />
      </Stack.Navigator>
      <SampleBottomSheetScreen />
    </InputContext.Provider>
  );
};
