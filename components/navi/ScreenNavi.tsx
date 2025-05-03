import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import Sample1 from "../input/Sample1";
import Sample2 from "../Sample2";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InputScreen from "../input/InputScreen";
import MemoScreen from "../memo/MemoScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import NavigationBar from "./NavigationBar";

export default function ScreenNavi() {
  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Tab.Navigator
          initialRouteName="Input"
          screenOptions={{ tabBarStyle: { display: "none" }, headerShown: false }}
        >
          <Tab.Screen name="Input" component={InputScreen} />
          <Tab.Screen name="Memo" component={MemoScreen} />
        </Tab.Navigator>
        <NavigationBar />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
