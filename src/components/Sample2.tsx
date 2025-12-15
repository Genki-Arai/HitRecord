import { useNavigation, useRoute, NavigationProp, DrawerActions } from "@react-navigation/native";
import { Button, Text, TouchableOpacity, View } from "react-native";

type RootStackParamList = {
  Details: { id: number; name: string };
};

export default function Sample2() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   const navigation = useNavigation();



  const gotoDetails = () => {
    navigation.navigate("Details", { id: 1, name: "Sample2" });

  }

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  }
  const closeDrawer = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  }

  return (
    <View>
      <TouchableOpacity onPress={gotoDetails}>
        <Text>これはHome画面</Text>
      </TouchableOpacity>
      <Button onPress={openDrawer} title="Open Drawer" />
      <Button onPress={closeDrawer} title="Close Drawer" />
    </View>
  );
}
