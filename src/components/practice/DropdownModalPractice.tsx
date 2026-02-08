import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import ModalDropdown from "react-native-modal-dropdown"
// ライブラリをインポート

const data = ['項目 A', '項目 B', '項目 C', '項目 D'];
const { width } = Dimensions.get('window');

const DropdownModalPractice = () => {
  const dropdownRef = useRef<ModalDropdown>(null);
  const [selectedItem, setSelectedItem] = useState('未選択');

  // 1. TouchableOpacityがタップされたときにドロップダウンを開く関数
  const showDropdown = () => {
    // refを通じて、手動でドロップダウンを開く
    if (dropdownRef.current) {
      dropdownRef.current.show();
    }
  };

  // 2. 項目が選択されたときのコールバック
  const onSelect = (index: string, value: string) => {
    setSelectedItem(value);
    console.log(`選択されたインデックス: ${index}, 値: ${value}`);
  };

  return (
    <View style={styles.container}>
      {/* =========================================
           A. タップトリガーとなるカスタムコンポーネント
           ========================================= */}
      <TouchableOpacity 
        onPress={showDropdown} // 押されたら手動でドロップダウンを開く
        style={styles.triggerButton}
      >
        <Text style={styles.triggerText}>
          {selectedItem === '未選択' ? 'タップして選択' : selectedItem}
        </Text>
        <Text style={styles.icon}>▼</Text>
      </TouchableOpacity>

      {/* =========================================
           B. ドロップダウン本体
           ========================================= */}
      <ModalDropdown
        ref={dropdownRef} // 手動で操作するためのrefを設定
        options={data} // 選択肢のデータ
        onSelect={onSelect} // 選択時の処理

        // 非表示にする設定（トリガーは手動で指定するため）
        dropdownStyle={styles.dropdownStyle}
        defaultIndex={-1}
        
        // ドロップダウンの表示位置を調整（任意）
        style={{ width: 200, height: 0 }} // 画面に表示されないようにサイズを0にする
        textStyle={{ fontSize: 0 }} // テキストも表示されないように
        
        // レンダリングスタイル（任意。リストの見た目を調整）
        renderRow={(option: string, index: string, isSelected: boolean) => (
          <View key={index} style={[styles.dropdownRow, isSelected && { backgroundColor: '#ddd' }]}>
            <Text style={styles.dropdownRowText}>{option}</Text>
          </View>
        )}
      />
      
    </View>
  );
};

export default DropdownModalPractice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  triggerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  triggerText: {
    fontSize: 16,
    color: '#333',
  },
  icon: {
    fontSize: 14,
    color: '#333',
  },
  dropdownStyle: {
    width: 200, // トリガーボタンと同じ幅に設定
    height: 30 * data.length + 2, // 項目数に合わせて高さを設定
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
  },
  dropdownRow: {
    padding: 10,
    height: 30,
    justifyContent: 'center',
  },
  dropdownRowText: {
    fontSize: 16,
    color: '#333',
  },
});