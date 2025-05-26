import { createStackNavigator } from "@react-navigation/stack"
import InputScreen from "../input/InputScreen";
import HitResultBase from "../input/HitResultBase";
import { EditHitDataOfDate, RootStackParamList } from "../input/EditHitDataOfDate";
import InputMain from "../input/InputMain";


export default () => {

    const Stack = createStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator initialRouteName="InputMain" screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="InputMain" component={InputScreen} /> */}
            <Stack.Screen name="InputMain" component={InputMain} />
            <Stack.Screen name="EditHitDataOfDate" component={EditHitDataOfDate} />
        </Stack.Navigator>
    )
}