import { NavigationContainer } from "@react-navigation/native";
import ScreenNavi from "./src/navigation/TabScreenNavi";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { UserDataType } from "./src/db/repositories/UserRepository.type";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { UserRepository } from "./src/db/repositories/UserRepository";
import { UserContext } from "./src/contexts/UserContext";
// import SampleBottomSheetScreen from "./components/practice/SampleBottomSheetScreen";

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserDataType | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        let user = await UserRepository.getUserById(firebaseUser.uid);
        if (!user) {
          await UserRepository.createUser({ id: firebaseUser.uid });
          user = await UserRepository.getUserById(firebaseUser.uid);
        }
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setIsAuthReady(true);
    });
    return unsubscribe;
  }, []);

  console.log("App");
  return (
    <UserContext.Provider value={{ currentUser, isAuthReady }}>
      <GestureHandlerRootView>
        <NavigationContainer>
          <ScreenNavi />

          {/* <TopPage /> */}

          {/* <DrawerTopPage /> */}
        </NavigationContainer>
        {/* <SampleBottomSheetScreen /> */}
      </GestureHandlerRootView>
    </UserContext.Provider>
  );
}
