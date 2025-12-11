import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MemoScreen from "../screens/memo/MemoScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import NavigationBar from "./NavigationBar";
import InitialSetup from "../screens/initialSetup/InitialSetup";
import StackInputScreenNavi from "./StackInputScreenNavi";
import SampleBottomSheetScreen from "../components/practice/SampleBottomSheetScreen";

export default function ScreenNavi() {
  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Tab.Navigator
          initialRouteName="InitialSetup"
          screenOptions={{
            tabBarStyle: { display: "none" },
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="InitialSetup"
            component={InitialSetup}
            options={{}}
          />
          <Tab.Screen name="Input" component={StackInputScreenNavi} />
          <Tab.Screen name="Memo" component={MemoScreen} />
        </Tab.Navigator>
        <NavigationBar />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
