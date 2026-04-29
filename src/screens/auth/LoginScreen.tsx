import { createUserWithEmailAndPassword, signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../firebaseConfig";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  const navigation = useNavigation<any>();

  const gotoInputScreen = () => {
    navigation.navigate("Input");
  };

  // ゲストモード（匿名認証）
  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth);
      // 自動的にオン状態が検知され、ホームへ遷移する（別途AppNavigatorで実装）
      gotoInputScreen();
    } catch (error: any) {
      Alert.alert("エラー", "ゲストログインに失敗しました");
        console.error("ゲストログインエラー: ", error);
    }
  };

  // メールアドレス認証
  const handleAuth = async () => {
    try {
      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, email, password);
        gotoInputScreen();
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        gotoInputScreen();
      }
    } catch (error: any) {
      Alert.alert("認証エラー", error.message);
         console.error("認証エラー: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>正射必中メモ</Text>
      
      {/* ゲストボタン（メイン導線） */}
      <TouchableOpacity style={styles.guestButton} onPress={handleGuestLogin}>
        <Text style={styles.guestButtonText}>登録せずに始める</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>または</Text>
        <View style={styles.line} />
      </View>

      {/* メールログインフォーム */}
      <TextInput
        style={styles.input}
        placeholder="メールアドレス"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="パスワード"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
        <Text style={styles.authButtonText}>
          {isLoginMode ? "ログイン" : "新規アカウント作成"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLoginMode(!isLoginMode)}>
        <Text style={styles.switchText}>
          {isLoginMode ? "新しくアカウントを作る" : "既にアカウントをお持ちの方"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 30, backgroundColor: '#F8F9FA' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 50, color: '#2D3436' },
  guestButton: { backgroundColor: '#2D3436', padding: 15, borderRadius: 8, marginBottom: 30 },
  guestButtonText: { color: '#FFF', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  line: { flex: 1, height: 1, backgroundColor: '#DDD' },
  dividerText: { marginHorizontal: 10, color: '#999' },
  input: { backgroundColor: '#FFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#DDD', marginBottom: 15 },
  authButton: { backgroundColor: '#636E72', padding: 15, borderRadius: 8, marginTop: 10 },
  authButtonText: { color: '#FFF', textAlign: 'center', fontWeight: 'bold' },
  switchText: { textAlign: 'center', marginTop: 20, color: '#0984E3' },
});