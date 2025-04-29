import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

export default function ScreenNavi() {
    const Stack = createStackNavigator()
    
    return (
        <>
        <Stack.Navigator initialRouteName="Home">

        </Stack.Navigator>
        </>
    );
}