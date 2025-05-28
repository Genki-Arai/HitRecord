import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import ScreenNavi from "./components/navi/TabScreenNavi";

export default function App() {
  console.log("App");
  return (
    // <NavigationContainer>
    //   <SafeAreaProvider style={styles.container}>
    //     <SafeAreaView style={styles.content}>
    //       <ScreenNavi />
    //     </SafeAreaView>
    //   </SafeAreaProvider>
    // </NavigationContainer>
    <NavigationContainer>
      <ScreenNavi />

      {/* <TopPage /> */}

      {/* <DrawerTopPage /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
