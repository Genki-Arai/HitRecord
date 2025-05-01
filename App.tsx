import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ScreenNavi from "./components/navi/ScreenNavi";
import TopPage from "./components/practice/TopPage";
import BottomTabTopPage from "./components/practice/BottomTabTopPage";
import DrawerTopPage from "./components/practice/DrawerTopPage";

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
          {/* <TopPage /> */}

          <BottomTabTopPage />
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
