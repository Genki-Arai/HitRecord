import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import Sample1 from "../input/Sample1";
import Sample2 from "../Sample2";


export default function ScreenNavi() {
    const Stack = createNativeStackNavigator();

    console.log("ScreenNavi");
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Sample2} options={{ title: 'Welcome' }} />
            <Stack.Screen name="Details" component={Sample1} options={{ title: 'Details' }} />
        </Stack.Navigator>
    )

}