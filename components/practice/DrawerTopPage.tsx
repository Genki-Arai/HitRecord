import { createDrawerNavigator } from "@react-navigation/drawer";
import Sample2 from "../Sample2";
import Sample1 from "../input/Sample1";


export default function DrawerTopPage() {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Sample2} options={{ title: 'ホーーム画面' }} />
            <Drawer.Screen name="Details" component={Sample1} options={{ title: 'しょーさい' }} />
        </Drawer.Navigator>
    )
}