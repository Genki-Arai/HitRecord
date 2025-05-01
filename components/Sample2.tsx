import { useNavigation, useRoute, NavigationProp } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

type RootStackParamList = {
  Details: { id: number; name: string };
};

export default function Sample2() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   const navigation = useNavigation();

  const gotoDetails = () => {
    navigation.navigate("Details", { id: 1, name: "Sample2" });

  }

  return (
    <View>
      <TouchableOpacity onPress={gotoDetails}>
        <Text>これはHome画面</Text>
      </TouchableOpacity>
    </View>
  );
}
