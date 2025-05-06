import { NavigationProp, useNavigation, DrawerActions } from "@react-navigation/native";
import { Button, Text, TouchableOpacity, View } from "react-native";

export default function Sample1() {
  type RootStackParamList = {
    Home: { id: number; name: string };
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const navigation2 = useNavigation();

  const gotoHome = () => {
    navigation.navigate("Home", { id: 1, name: "Sample1" });
  }

  const openDrawer = () => {
    navigation2.dispatch(DrawerActions.openDrawer());
  }
  const closeDrawer = () => {
    navigation2.dispatch(DrawerActions.closeDrawer());
  }

  console.log("Sample1");
  return (
    <View>
      <TouchableOpacity onPress={gotoHome}>
        <Text>abcd</Text>
      </TouchableOpacity>
      <Button onPress={openDrawer} title="Open Drawer" />
      <Button onPress={closeDrawer} title="Close Drawer" />
    </View>
  );
}
