import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Sample2 from "../Sample2";
import Sample1 from "../input/Sample1";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function BottomTabTopPage() {

    const Tab = createBottomTabNavigator();
    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>

        <Tab.Navigator initialRouteName="Home" screenOptions={{tabBarStyle: {display: "none"}}}>
            <Tab.Screen name="Home" component={Sample2} options={{headerShown: false, tabBarLabel: "gogogo"}}/>
            <Tab.Screen name="Details" component={Sample1} options={{headerShown: false, tabBarStyle:{display: "none"}}} />
        </Tab.Navigator>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = {
    toppage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
}