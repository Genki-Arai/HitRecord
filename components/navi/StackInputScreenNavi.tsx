import { createStackNavigator } from "@react-navigation/stack"
import InputScreen from "../input/InputScreen";


export default () => {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="InputMain" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="InputMain" component={InputScreen} />
            <Stack.Screen name='InputData' component={InputScreen} />
        </Stack.Navigator>
    )
}