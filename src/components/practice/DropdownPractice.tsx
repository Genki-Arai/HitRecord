import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
// 必要なコンポーネントをインポート
import { Dropdown } from 'react-native-element-dropdown'; 

// 選択肢となるデータ構造を定義（labelとvalueが必須）
const data = [
  { label: 'JavaScript', value: '1' },
  { label: 'Python', value: '2' },
  { label: 'Java', value: '3' },
  { label: 'Swift', value: '4' },
  { label: 'Kotlin', value: '5' },
];

const DropdownPractice = () => {
  const [value, setValue] = useState(null); // 選択された値を保持するステート
  const [isFocus, setIsFocus] = useState(false); // ドロップダウンが開いているかどうかのステート

  // 選択肢のラベルを表示するヘルパー関数
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          選択中の言語
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()} 
      
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        
        // データの指定 (必須)
        data={data}
        
        // データのどのキーをラベル（表示名）として使うか (必須)
        labelField="label"
        
        // データのどのキーを値（内部で保持する値）として使うか (必須)
        valueField="value"
        
        // プレースホルダーテキスト
        placeholder={!isFocus ? '言語を選択してください' : '...'}
        
        // 検索機能の有効化
        search
        searchPlaceholder="検索..."
        
        // 現在の選択値
        value={value}
        
        // ドロップダウンが開いたとき/閉じたときの処理
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        
        // 項目が選択されたときの処理
        onChange={item => {
          setValue(item.value); // 選択された項目の value をステートにセット
          setIsFocus(false);
        }}
        
        // 選択された項目のアイコン
        renderLeftIcon={() => (
          <Text style={{marginRight: 8}}>🀄️</Text>
        )}
      />
    </View>
  );
};

export default DropdownPractice;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    padding: 40,
    paddingTop: 80, // 画面中央より少し下に表示するための調整
  },
  dropdown: {
    height: 50,
    width: 200,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 60,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});