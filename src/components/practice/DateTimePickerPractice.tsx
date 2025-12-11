import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    
    // Androidでは選択後にピッカーを閉じる必要があるため setShow(false) する
    // Androidではモーダルとして表示されるため選択されたら閉じる必要がある
    if (Platform.OS === 'android') {
      setShow(false);
    }
    setDate(currentDate);
  };

  const showDatepicker = () => {
    if(show){
        setShow(false);
        return;
    }
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>選択された日付: {date.toLocaleDateString()}</Text>
      
      {/* 日付選択ボタン（主にAndroid用、iOSでもトリガーとして使用可） */}
      <Button onPress={showDatepicker} title="日付を選択する" />

      {/* ピッカー本体 */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date" // "date" | "time" | "datetime"
          is24Hour={true}
          display="default" 
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginBottom: 20,
    fontSize: 18,
  },
});