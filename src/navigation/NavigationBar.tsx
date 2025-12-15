import { Entypo, Feather, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity } from "react-native";
import { ViewStyle } from "react-native";

export default () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.navigationBarContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("Input")}>
        <SimpleLineIcons name="pencil" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Memo")}>
        <Feather name="file-text" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Entypo name="archive" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <SimpleLineIcons name="settings" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles: { navigationBarContainer: ViewStyle } = {
  navigationBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
};
