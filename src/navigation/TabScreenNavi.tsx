import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MemoScreen from "../screens/memo/MemoScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import NavigationBar from "./NavigationBar";
import InitialSetup from "../screens/initialSetup/InitialSetup";
import StackInputScreenNavi from "./StackInputScreenNavi";
import SampleBottomSheetScreen from "../components/practice/SampleBottomSheetScreen";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ActivityIndicator, View } from "react-native";

export default function ScreenNavi() {
  const Tab = createBottomTabNavigator();
  const { currentUser, isAuthReady } = useContext(UserContext);

  if (!isAuthReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Tab.Navigator
          initialRouteName={currentUser ? "InitialSetup" : "Auth"}
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
          <Tab.Screen name="Auth" component={LoginScreen} />
        </Tab.Navigator>
        <NavigationBar />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
