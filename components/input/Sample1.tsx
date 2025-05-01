import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

export default function Sample1() {
  type RootStackParamList = {
    Home: { id: number; name: string };
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const gotoHome = () => {
    navigation.navigate("Home", { id: 1, name: "Sample1" });
  }
  console.log("Sample1");
  return (
    <View>
      <TouchableOpacity onPress={gotoHome}>
        <Text>abcd</Text>
      </TouchableOpacity>
    </View>
  );
}
