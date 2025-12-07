import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Sample2 from "../Sample2";
import Sample1 from "../input/Sample1";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function TopPage() {
    const Stack = createNativeStackNavigator();
    return (
        <SafeAreaProvider style={{ flex: 1 }}>

        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Sample2} options={{ title: 'Welcome', headerShown:false }} />
                <Stack.Screen name="Details" component={Sample1} options={{ title: 'Details', headerShown: false }} />
            </Stack.Navigator>
        </SafeAreaView>
        </SafeAreaProvider>
       
    )
}