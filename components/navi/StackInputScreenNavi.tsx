import { createStackNavigator } from "@react-navigation/stack";
import { EditHitDataOfDate } from "../input/EditHitDataOfDate";
import InputMain from "../input/InputMain";
import { RootStackParamList } from "../../types/input/navigationTypes";

export default () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="InputMain"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="InputMain" component={InputMain} />
      <Stack.Screen name="EditHitDataOfDate" component={EditHitDataOfDate} />
    </Stack.Navigator>
  );
};
